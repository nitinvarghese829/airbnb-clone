const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking');
const bcrypt = require('bcryptjs')
require('dotenv').config();
const jwt = require('jsonwebtoken');
const download = require('image-downloader');
const multer  = require('multer')
const fs = require("fs");
const {json} = require("express");


const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'test';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
    res.json("ok");
})

app.post('/register', async (req, res) => {

    const { name, email, password } = req.body;
    try {
        const userDoc =  await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }

});

app.post('/login', async (req, res) => {

    const { email, password } = req.body;
    try {
        const userDoc =  await User.findOne({email})

        if(userDoc){
            const checkPassword = bcrypt.compareSync(password, userDoc.password);
            if(checkPassword){
                jwt.sign({
                    email: userDoc.email,
                    id: userDoc._id
                }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(userDoc);
                });

            } else {
                res.status(422).json('pass error');
            }

        } else {
            res.json('not found');
        }
    } catch (e) {
        res.status(422).json(e);
    }

});


app.get('/profile', (req, res) => {
   const {token} = req.cookies;
   if(token){
       jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err;
          const {name, email, _id} = await User.findById(userData.id);
          res.json({name, email, _id});
       });
   } else {
       res.json(null);
   }
});

app.get('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.post('/upload-photo', async (req, res) => {
    const {link} = req.body;
    const fn = Date.now() + '.jpg';
    const options = {
        url: link,
        dest: __dirname + '/uploads/' + fn,     // will be saved to /path/to/dest/photo.jpg
    };
    download.image(options)
        .then(({ filename }) => {
            res.json(fn); // saved to /path/to/dest/photo.jpg
        })
        .catch((err) => {
            res.json('no');
            console.error(err);
        });
});

const photosMiddleware = multer({dest: 'uploads/'});
app.post('/uploads', photosMiddleware.array('photos', 100), (req, res) => {
    console.log(req.files);
    const uploadedPhotos = [];
    for (let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');

        const ext = parts[parts.length - 1];
        const fn = path + '.' + ext;

        fs.renameSync(path, fn);

        uploadedPhotos.push(fn.replace('uploads/', ''));

    }
    res.json(uploadedPhotos);
});


app.post('/add-place', async(req, res) => {
    const { title, address, addedPhotos, description, extraInfo, checkIn, checkOut, maxGuests, perks, user, price } = req.body;

    try {
        const placeDoc =  await Place.create({
            owner: user._id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        })
        res.json(placeDoc);
    } catch (e) {
        res.status(422).json(e);
    }
})

app.put('/update-place', async(req, res) => {
    const { id, title, address, addedPhotos, description, extraInfo, checkIn, checkOut, maxGuests, perks, user, price } = req.body;
    const placeDoc = await Place.findById(id);

    if(placeDoc.owner.toString() === user._id){
        placeDoc.set({ title, address, photos: addedPhotos, description, extraInfo, checkIn, checkOut, maxGuests, perks, price })
        await placeDoc.save();
        console.log("test");
        res.json("ok");
    }



})

app.get('/fetch-places-by-user', (req, res) => {
    const {token} = req.cookies;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        res.json(await Place.find({ owner: userData.id }));
    });
});

app.get('/fetch-all-places', async (req, res) => {
    const searchValue = req.query.search;
    let page = req.query.page;
    if(!page){
        page = 1;
    }
    let limit = 2;
    const searchTerm = new RegExp(searchValue, 'i')
    if(searchValue) {
        res.json(await Place.find({
            $or: [
                { title: searchTerm },
                { address: searchTerm }
            ]
        }).limit(2));
    } else {
        res.json(await Place.find().limit(2));
    }
});

app.get('/public/place/:id', async (req, res) => {
    const {id} = req.params;
    console.log(id);
    res.json(await Place.findById(id));
});

app.get('/place/:id', (req, res) => {
    const {id} = req.params;
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id);
        if(userData.id === placeDoc.owner.toString()) {
            res.json(placeDoc);
        }
    });
});

const getLoggedInUser = (req) => {
    const {token} = req.cookies;
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            resolve(userData);
        });
    })

}


app.post('/create-booking', async (req, res) => {
    const userData = await getLoggedInUser(req);
    const {place, checkIn, checkOut, maxGuests, name, email, mobile, price} = req.body;
    try {
        const bookingDoc =  await Booking.create({
            place, checkIn, checkOut, maxGuests, name, email, mobile, price, user: userData.id
        })
        res.json(bookingDoc);
    } catch (e) {
        res.status(422).json(e);
    }

});

app.get('/get-booking/:id', async (req, res) => {
    const {id} = req.params;
    const userData = await getLoggedInUser(req);

    try {
        const bookingDoc = await Booking.findOne({_id: id, user: userData.id}).populate('place');
        res.json(bookingDoc);
    } catch (e) {
        res.status(422).json(e);
    }

})

app.get('/get-bookings-by-user', async (req, res) => {
    const {id} = req.params;
    const userData = await getLoggedInUser(req);

    try {
        const bookingsDoc = await Booking.find({user: userData.id}).populate('place');
        res.json(bookingsDoc);
    } catch (e) {
        res.status(422).json(e);
    }

})

app.listen(4000);
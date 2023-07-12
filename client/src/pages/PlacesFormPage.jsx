import React, {useContext, useEffect, useState} from 'react'
import UploadPhoto from "../components/UploadPhoto.jsx";
import Perks from "../components/Perks.jsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {UserContext} from "../UserContext.jsx";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function PlacesFormPage() {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [perks, setPerks] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [price, setPrice] = useState(0);

    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const {id} = useParams();

    const fetchCurrentPlace = async () => {
        const {data:currentPlace} = await axios.get('place/'+id);
        setTitle(currentPlace.title);
        setAddress(currentPlace.address);
        setAddedPhotos(currentPlace.photos);
        setDescription(currentPlace.description);
        setExtraInfo(currentPlace.extraInfo);
        setCheckIn(currentPlace.checkIn);
        setCheckOut(currentPlace.checkOut);
        setMaxGuests(currentPlace.maxGuests);
        setPerks(currentPlace.perks);
        setPrice(currentPlace.price);
        console.log(currentPlace);
        setLoaded(false);
    }

    useEffect(() => {
        if(id) {
            setLoaded(true);
            fetchCurrentPlace();
        }
    }, [])

    const addHeader = (header) => {
        return <p className={'header capitalize text-2xl'}>{header}</p>
    }

    const addSubHeader = (subheader) => {
        return <label className={'subheader text-xs text-gray-500'}>{subheader}</label>
    }

    const renderHeader = (header, subheader) => {
        return (
            <div>
                {addHeader(header)}
                {addSubHeader(subheader)}
            </div>
        )
    }
    console.log(user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            id, title, address, addedPhotos, description, extraInfo, checkIn, checkOut, maxGuests, perks,
            user, price
        }
        if(id){
            await axios.put('update-place', data).then(res => {
                    navigate('/account/accommodations');
                }
            );
        } else {
            await axios.post('add-place', data).then(res => {
                    navigate('/account/accommodations');
                }
            );
        }



    }

    return (
        <div>{loaded ? (
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-700 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-700 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <form className={'add-place-form'} onSubmit={handleSubmit}>
                <div className={'py-2'}>
                    {renderHeader('title', 'Add a catchy title to your place')}
                    <input type={'text'} value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className={'py-2'}>
                    {renderHeader('Address', 'Add a address to this place')}
                    <input type={'text'} value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className={'py-2'}>
                    {renderHeader('Photos', 'Add photos for the clients to choose your property')}
                    <UploadPhoto addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
                </div>
                <div className={'py-2'}>
                    {renderHeader('Description', 'Add description for your property')}
                    <CKEditor
                        editor={ ClassicEditor }
                        data={description}
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setDescription(data);
                            console.log( { event, editor, data } );
                        } }

                    />
                </div>
                <div className={'py-2'}>
                    {renderHeader('Perks', 'Add perks for your property')}
                    <Perks selected={perks} onChange={setPerks}/>
                </div>
                <div className={'py-2'}>
                    {renderHeader('Extra Info', 'Any rules to be specified')}
                    <input type={'text'} value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />
                </div>
                <div className={'py-2'}>
                    <div className={'grid grid-cols-4 gap-4 md:grid-col-4 md:grid-col-6'}>
                        <div>
                            {renderHeader('Check-in Time', '')}
                            <input type={'number'} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                        </div>
                        <div>
                            {renderHeader('Check-out Time', '')}
                            <input type={'number'} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                        </div>
                        <div>
                            {renderHeader('Max. Guests', '')}
                            <input type={'number'} value={maxGuests} onChange={(e) => setMaxGuests(parseInt(e.target.value))} />
                        </div>
                        <div>
                            {renderHeader('Price', '')}
                            <input type={'number'} value={price} onChange={(e) => setPrice(parseInt(e.target.value))} />
                        </div>

                    </div>
                </div>
                <div className={'py-2 text-center'}>
                    <button className={'btn-primary bg-primary rounded-full text-white px-8 py-2'} type={'submit'} >Save</button>
                </div>
            </form>
        )}

        </div>
    )
}

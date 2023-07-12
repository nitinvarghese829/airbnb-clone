import React, {useState} from 'react'
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {da} from "date-fns/locale";

export default function Booking({place}) {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    let noOfDays = 0;

    const navigate = useNavigate();

    noOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {data} = await axios.post('/create-booking', {
            place: place._id, checkIn, checkOut, maxGuests, name, email, mobile, price: noOfDays*place.price
        });

        navigate('/account/booking/'+data._id);

    }

    return (
        <div>
            <form className="border rounded-2xl overflow-hidden" onSubmit={handleSubmit}>
                <div className={'text-center text-2xl py-4'}>Price per night: $ {place.price}</div>
                <div className="flex gap-2 border-t">
                    <div className="bg-white p-3">
                        <div>Check In</div>
                        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}/>
                    </div>
                    <div className="bg-white border-l p-3">
                        <div>Check Out</div>
                        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <div className="bg-white border-t p-3">
                        <div>Max Guests</div>
                        <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
                    </div>
                </div>
                {checkIn && checkOut &&(
                    <>
                        <div>
                            <div className="bg-white border-t p-3">
                                <div>Name</div>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                        </div>
                        <div>
                            <div className="bg-white border-t p-3">
                                <div>Email</div>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <div className="bg-white border-t p-3">
                                <div>Mobile</div>
                                <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                            </div>
                        </div>
                    </>
                )}

                <div className={'text-center'}>
                    <button className={'bg-primary text-white px-4 py-3 mb-4 mx-auto rounded-2xl'}>Book now {checkIn && checkOut && '@ $' + noOfDays*place.price.toFixed(2) }</button>
                </div>

            </form>
        </div>
    )
}

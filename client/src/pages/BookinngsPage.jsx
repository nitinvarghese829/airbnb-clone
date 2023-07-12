import React, {useEffect, useState} from 'react'
import axios from "axios";
import {ExampleLoaderComponent} from "../dev/palette.jsx";
import {Link} from "react-router-dom";

export default function BookinngsPage() {
    const [bookings, setBookings] = useState([]);

    const getAllBookings = async () => {
        const {data} = await axios.get('/get-bookings-by-user');
        setBookings(data);
    }

    useEffect(() => {
        getAllBookings();
    }, []);
    return (
        <div>
            {bookings.length > 0 ? (<>
                {bookings.map((booking, index) => {
                    return(
                        <Link to={'/account/booking/'+booking._id} className={'bg-gray-300 p-3 rounded-2xl grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3  gap-4 items-center justify-between'} key={index}>
                            <div className={'w-48'}>
                                <img className={'rounded-2xl'} src={'http://localhost:4000/uploads/'+booking.place.photos[0]} />
                            </div>
                            <div className={'flex flex-col justify-center'}>
                                <h1 className={'text-xl'}>{booking.place.title}</h1>

                                <div className={'flex gap-2 text-gray-500 py-3'}>
                                    <div className={'flex gap-2'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                        </svg>
                                        {booking.checkIn}
                                    </div>
                                    <div> - </div>

                                    <div className={'flex gap-2'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                        </svg>
                                        {booking.checkIn}
                                    </div>
                                </div>

                            </div>
                            <div className={'flex justify-end'}>
                                <div className={'bg-primary inline p-4 my-4 rounded-2xl'}>
                                    Total: ${booking.price}
                                </div>
                            </div>

                        </Link>
                    )
                })}
            </>) :(
                <ExampleLoaderComponent />
            ) }


        </div>
    )
}

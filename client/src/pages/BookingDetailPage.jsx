import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios";
import PhotoGallery from "../components/PhotoGallery.jsx";

export default function BookingDetailPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState();

    const fetchCurrentBooking = async () => {
        const {data} = await axios.get('/get-booking/'+id);
        setBooking(data);
    }

    useEffect(() => {
        fetchCurrentBooking();
    }, [])


    if(!booking){
        return  '';
    }


    return (
        <div className={'mt-8 p-4 pt-8'}>
            <div>
                <h1 className={'text-2xl'}>{booking?.place.title}</h1>
                <a target='_blank' className={'text-gray-700 text-sm underline items-center my-1 flex gap-1'} href={'https://maps.google.com?q='+booking?.place.address}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {booking?.place.address}
                </a>
            </div>

            <div className={'flex my-4 p-4 bg-gray-300 rounded-2xl justify-between items-cennter'}>
                <div className={'flex flex-col justify-center'}>
                    <h3>Your booking Info</h3>
                    <div className={'flex gap-2 py-3'}>
                        <div className={'flex gap-2'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                            {booking?.checkIn}
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
                    <div className={'bg-primary text-white inline p-4 my-4 rounded-2xl'}>
                        Total: ${booking.price}
                    </div>
                </div>

            </div>

            <div>
                <PhotoGallery place={booking && booking?.place} />
            </div>
        </div>
    )
}

import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios";
import {ExampleLoaderComponent} from "../dev/palette.jsx";
import Booking from "../components/Booking.jsx";
import PhotoGallery from "../components/PhotoGallery.jsx";

export default function PublicPlaces() {
    const [place, setPlace] = useState({});

    const {id} = useParams();

    const fetchCurrentPlace = async () => {
        const {data}  = await axios.get('/public/place/'+id);
        setPlace(data);
    }

    useEffect(() => {
        fetchCurrentPlace();
    }, [])


    return (
        <div>
            {place && place.id ? (<ExampleLoaderComponent />) : (
                <div  className={'my-8 max-w-7xl mx-auto'}>
                    <h1 className={'text-2xl'}>{place.title}</h1>
                    <a target='_blank' className={'text-gray-700 text-sm underline items-center my-1 flex gap-1'} href={'https://maps.google.com?q='+place.address} rel="noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {place.address}
                    </a>

                    <PhotoGallery place={place} />

                    <div className={'grid gap-2 grid-cols-1 md:grid-cols-[2fr_1fr] rounded-2xl'}>
                        <div>
                            <h2>Description</h2>
                            <div className={'text-gray-500 pr-5'} dangerouslySetInnerHTML={{ __html: place.description }} />

                        </div>

                        <div>
                            <Booking place={place}/>
                        </div>
                    </div>



                </div>
            )}
        </div>
    )
}

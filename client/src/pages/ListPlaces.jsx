import React, {useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

export default function ListPlaces() {
    const [places, setPlaces] = useState([]);

    const fetchPlacesByUser = async () => {
        const {data} = await axios.get('/fetch-places-by-user');
        setPlaces(data);
    }

    useState(() => {
        fetchPlacesByUser();
    }, [])

    console.log('places', places)
    return (
        <div>
            <div>
                {places.length > 0 ? (
                    <div className="grid grid-cols-6 gap-4 md:grid-col-2 lg:grid-col-6">
                        {places.map((place, index) => (
                            <Link to={'/account/accommodations/' + place._id} key={index}>
                                <div className={'w-48 h-48'}>
                                    <img className={'rounded-2xl h-full object-cover'} height={200} src={'http://localhost:4000/uploads/' + place.photos[0]}  alt={'image'}/>
                                </div>

                                <h2 className={'font-bold'}>{place.address}</h2>
                                <div className={'max-h-12 truncate'}>
                                    <div className={'text-gray-500'} dangerouslySetInnerHTML={{ __html: place.description }} />
                                </div>
                                <div>
                                    <p className={''}>$ {place.price} / night</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div>No results founnd</div>
                ) }
            </div>
        </div>
    )
}

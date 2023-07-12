import Header from "../components/Header.jsx";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {UserContext} from "../UserContext.jsx";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    const {search} = useContext(UserContext);

    const fetchAllPlaces = async () => {
        const {data} =  await axios.get('fetch-all-places?search='+search);
        setPlaces(data);
    }
    useEffect(() => {
        fetchAllPlaces()
    }, [search])
    return (
        <div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                {places.map((place, index) => (
                    <Link to={'accommodations/' + place._id} key={index}>
                        <div className={'w-full h-48'}>
                            <img className={'rounded-2xl w-full h-full object-cover'} src={'http://localhost:4000/uploads/' + place.photos[0]}  alt={'image'}/>
                        </div>

                        <h2 className={'font-bold capitalize'}>{place.address}</h2>
                        <div className={'max-h-12 truncate'}>
                            <div className={'text-gray-500 capitalize'} dangerouslySetInnerHTML={{ __html: place.description }} />
                        </div>
                        <div>
                            <p className={''}>$ {place.price} / night</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

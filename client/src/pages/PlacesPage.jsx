import React, {useContext, useState} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import Perks from "../components/Perks.jsx";
import axios from "axios";
import {UserContext} from "../UserContext.jsx";
import UploadPhoto from "../components/UploadPhoto.jsx";
import ListPlaces from "./ListPlaces.jsx";
import PlacesFormPage from "./PlacesFormPage.jsx";

export default function PlacesPage() {
    const {action} = useParams();

    return (
        <div>
            {action !== 'new' && (
                <div>
                    <div className={'flex justify-center my-4'}>
                        <Link to={'/account/accommodations/new'} className={'flex gap-2 bg-primary px-5 py-2 rounded-full text-white'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            Add New
                        </Link>
                    </div>
                    <ListPlaces />
                </div>
            )}
            {action === 'new' && (
                <PlacesFormPage />
            )}

        </div>
    )
}

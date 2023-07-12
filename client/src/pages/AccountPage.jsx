import React, {useContext} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import {UserContext} from "../UserContext.jsx";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import BookinngsPage from "./BookinngsPage.jsx";

export default function AccountPage() {
    let { subpage } = useParams();
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    if(subpage === undefined){
        subpage = 'profile';
    }

    if(!user){
        navigate('/');
    }

    console.log(subpage);
    const linkClass = (type) => {
        let classes = 'px-5 py-2 flex gap-2';
        if(subpage === type){
            classes =  classes +  ' bg-primary rounded-full text-white';
        }
        return classes;
    }

    const logout = async () => {
        const loggedout = await axios.get('/logout');
        if(loggedout){
            setUser(null);
        }
    }

    return (
        <div>
            <nav className={'flex gap-5 justify-center mt-8'}>
                <Link to={'/account'} className={linkClass('profile')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>

                    Profile
                </Link>
                <Link to={'/account/bookings'} className={linkClass('bookings')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>

                    My bookings
                </Link>
                <Link to={'/account/accommodations'} className={linkClass('accommodations')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                    </svg>

                    My Accommodations
                </Link>
            </nav>

            <div className={'mt-3'}>
                {subpage === 'profile' && (
                    <div className={'text-center'}>
                        <p>Logged in as {user && user.name}</p>
                        <button className={'bg-primary text-white rounded-full px-8 py-2 mt-4'} onClick={logout}>Logout</button>
                    </div>
                )}
                {subpage === 'accommodations' && (
                    <div>
                        <PlacesPage />
                    </div>
                )}
                {subpage === 'bookings' && (
                    <div>
                        <BookinngsPage />
                    </div>
                )}
            </div>
        </div>
    )
}

import React, {useContext, useState} from 'react'
import {Link} from "react-router-dom";
import {UserContext} from "../UserContext.jsx";
import axios from "axios";

export default function Header() {
    const {user, setSearch, search} = useContext(UserContext);

    const handleSearch = async (e) => {
        setSearch(e.target.value);
    }


    return (
        <header className={'flex justify-between py-2'}>
            <Link to={'/'} className={'flex items-center p-2'}>
                <svg width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                <span>airbnb</span>

            </Link>
            <div className={'relative items-center gap-2'}>
                {/*<div>Anywhere </div>*/}
                {/*<div className={'border-l border-gray-300 h-full'}></div>*/}
                {/*<div>Any Guest</div>*/}
                {/*<div className={'border-l border-gray-300 h-full'}></div>*/}
                {/*<div>Any Week</div>*/}
                <input type={'text'} value={search} onChange={(e) => handleSearch(e)}/>
                <button className={'bg-primary text-white rounded-full p-2 absolute bottom-3.5 right-2'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>


            <Link to={user ? '/account' :'/login'} className={'flex items-center gap-2 border border-gray-500 rounded-full p-2 shadow-md shadow-gray-300'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>

                <div className={'bg-gray-500 text-white rounded-full p-2'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-xl">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>

                </div>
                {!!user && (
                    <div>{user.name}</div>
                )}
            </Link>


        </header>
    )
}

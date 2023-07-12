import React, {useContext, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {ExampleLoaderComponent} from "../dev/palette.jsx";
import {UserContext} from "../UserContext.jsx";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/login', {
                email, password
            });
            setUser(data);
            console.log(user);
            alert('Login Success');
            setSpinner(false);
            navigate("/");
        } catch (e) {
            alert('Login failed');
            setSpinner(false);
        }


    }
    return (
        <div className={'mt-4'}>
            <div className={'text-center'}>
                <h1 className={'text-4xl'}>Login</h1>
            </div>

            <form className={'max-w-md mx-auto'} onSubmit={handleLogin}>
                <input type={'email'} placeholder={'youuremail@abc.com'} value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type={'password'} placeholder={'*******'} value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button className={'primary'} type={'submit'}>{spinner ? (<ExampleLoaderComponent />) : ('Login')}</button>
                <div>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <span>Don't have an account?
                        <Link to={'/register'}> Register</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

import React, {useState} from 'react'
import {Link} from "react-router-dom";
import axios from "axios";
import {ExampleLoaderComponent} from "../dev/palette.jsx";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [spinner, setSpinner] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setSpinner(true);
        console.log(name, email, password);
        try {

            await axios.post('/register', {
                name, email, password
            });
            alert('Registration completed Login');
            setSpinner(false);
        } catch (e) {
            alert('Registration failed, try again');
            setSpinner(false);
        }
    };

    return (
        <div className={'mt-4'}>
            <div className={'text-center'}>
                <h1 className={'text-4xl'}>Register</h1>
            </div>

            <form className={'max-w-md mx-auto'} onSubmit={handleRegister}>
                <input type={'text'} placeholder={'John Doe'} value={name} onChange={(e) => setName(e.target.value)} required/>
                <input type={'email'} placeholder={'youuremail@abc.com'} value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type={'password'} placeholder={'*******'} value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button className={'primary'} type={'submit'}>{spinner ? (<ExampleLoaderComponent />) : 'Register'}</button>
                <div>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <span>Already a member?
                        <Link to={'/login'}> Login</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

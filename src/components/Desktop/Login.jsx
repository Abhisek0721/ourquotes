import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState } from 'react';

const Login = ()=>{
    const [user, setUser] = useState({"username":'',"password":''});
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState(null);

    const loginSubmit = (e)=>{
        e.preventDefault();
        axios.post('/login', user).then((res)=>{
            if(res.data.auth === true){
                setAuth(true);
                setToken(res.data.token);
            }
        });
    }

    if(auth === true){
        localStorage.setItem('token',token);
        window.location.href = '/';
    }

    return (
        <div className="mt-[10vh] lg:mx-44 lg:my-20">
            <h1 className="text-3xl font-semibold text-center">Login to Our Quotes</h1>
            <div className="mt-10 mx-auto bg-slate-200 rounded-lg shadow-md sm:w-[700px] w-[90%] h-[400px]">
                <div className="logo w-[100%] flex justify-center">
                    <a className="flex title-font font-medium items-center text-black my-5" href="/">
                        <img src={require('../img/logo.png')} className="w-10 h-10" alt="" />
                        <span className="ml-3 text-xl font-bold">Our Quotes</span>
                    </a>
                </div>
                <div className="input-field w-[100%] mt-3">
                    <div className="flex py-2 bg-white rounded-md justify-center lg:w-[46%] w-[90%] mx-auto">
                        <span><FontAwesomeIcon icon={faUser} className="mx-auto px-2 mt-3 text-lg" /></span>
                        <span><input type="text" onChange={(e)=>{user.username = e.target.value; setUser({...user})}} name="username" id="username" placeholder="username" className="text-lg px-5 w-[95%] py-1 text-slate-600 outline-none rounded-md border-2 border-slate-200" /></span>
                    </div>
                    <div className="flex py-2 mt-2 bg-white rounded-md justify-center lg:w-[46%] w-[90%] mx-auto">
                        <span><FontAwesomeIcon icon={faKey} className="mx-auto px-2 mt-3 text-lg" /></span>
                        <span><input type="password" onChange={(e)=>{user.password = e.target.value; setUser({...user})}} name="password" id="password" placeholder="password" className="text-lg px-5 w-[95%] py-1 text-slate-600 outline-none rounded-md border-2 border-slate-200" /></span>
                    </div>
                    <div className="flex justify-center mt-3">
                        <button onClick={(e)=>loginSubmit(e)} className="px-5 py-1 text-lg font-semibold bg-red-700 text-white hover:bg-gray-900 rounded-md">Log in</button>
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-sm text-slate-600 text-center my-1">New to Our Quotes? <a href="/signup" className="text-red-700">Signup</a></p>
                    <p className="text-sm text-slate-600 text-center my-1">Back to Home Page: <a href="/" className="text-red-700">Our Quotes</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login;
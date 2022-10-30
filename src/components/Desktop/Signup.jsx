import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faF, faL, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = ()=>{
    const [user, setUser] = useState({"fname":'','lname':'','username':'','email':'','password':''});
    const navigate = useNavigate();
    const [msg, setMsg] = useState(null);

    const submitUser = (e)=>{
        e.preventDefault();
        axios.post('/signup', user).then((res)=>{
            if(res.data.msg){
                setMsg(res.data.msg);
                let msgTag = document.getElementById('msg');
                if(res.data.redirect === true){
                    msgTag.classList.remove('hidden');
                    msgTag.classList.add('bg-green-600');
                    setTimeout(()=>{
                        msgTag.classList.remove('bg-green-600');
                        msgTag.classList.add('hidden');
                        navigate('/login');
                    },3000);
                }else{
                    msgTag.classList.remove('hidden');
                    msgTag.classList.add('bg-red-600');
                    setTimeout(()=>{
                        msgTag.classList.remove('bg-red-600');
                        msgTag.classList.add('hidden');
                    },3000); 
                }
            }
        });
    }

    return (
    <div className="my-10 lg:mx-44 lg:my-20">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">Create Account on Davis Blog</h1>

        <p id='msg' className='px-5 py-2 text-lg text-center rounded-md mt-5 w-[50%] mx-auto text-white hidden'>{msg}</p>

        <div className="mt-10 mx-auto bg-slate-200 rounded-lg shadow-md sm:w-[700px] w-[90%] h-[550px]">
            <div className="logo w-[100%] flex justify-center">
                <Link to={'/'} className="flex title-font font-medium items-center text-black my-5">
                    <img src={require('../img/logo.png')} className="w-10 h-10" alt="" />
                    <span className="ml-3 text-xl font-bold">Our Quotes</span>
                </Link>
            </div>
            <form method='post' onSubmit={submitUser} className="input-field w-[100%] mt-3">
                <div className="flex py-2 bg-white rounded-md justify-center lg:w-[46%] w-[90%] mx-auto">
                    <span><FontAwesomeIcon icon={faF} className="mx-auto px-2 mt-3 text-lg" /></span>
                    <span><input type="text" onChange={(e)=>{user.fname = e.target.value; setUser({...user})}} name="fname" id="firstname" placeholder="First Name" className="text-lg px-5 w-[95%] py-1 text-slate-600 outline-none rounded-md border-2 border-slate-200" /></span>
                </div>
                <div className="flex py-2 mt-2 bg-white rounded-md justify-center lg:w-[46%] w-[90%] mx-auto">
                    <span><FontAwesomeIcon icon={faL} className="mx-auto px-2 mt-3 text-lg" /></span>
                    <span><input type="text" onChange={(e)=>{user.lname = e.target.value; setUser({...user})}} name="lname" id="lastname" placeholder="Last Name" className="text-lg px-5 w-[95%] py-1 text-slate-600 outline-none rounded-md border-2 border-slate-200" /></span>
                </div>
                <div className="flex py-2 mt-2 bg-white rounded-md justify-center lg:w-[46%] w-[90%] mx-auto">
                    <span><FontAwesomeIcon icon={faUser} className="mx-auto px-2 mt-3 text-lg" /></span>
                    <span><input type="text" onChange={(e)=>{user.username = e.target.value; setUser({...user})}} name="username" id="username" placeholder="Username" className="text-lg px-5 w-[95%] py-1 text-slate-600 outline-none rounded-md border-2 border-slate-200" /></span>
                </div>
                <div className="flex py-2 mt-2 bg-white rounded-md justify-center lg:w-[46%] w-[90%] mx-auto">
                    <span><FontAwesomeIcon icon={faEnvelope} className="mx-auto px-2 mt-3 text-lg" /></span>
                    <span><input type="email" onChange={(e)=>{user.email = e.target.value; setUser({...user})}} name="email" id="email" placeholder="Email" className="text-lg px-5 w-[95%] py-1 text-slate-600 outline-none rounded-md border-2 border-slate-200" /></span>
                </div>
                <div className="flex py-2 mt-2 bg-white rounded-md justify-center lg:w-[46%] w-[90%] mx-auto">
                    <span><FontAwesomeIcon icon={faKey} className="mx-auto px-2 mt-3 text-lg" /></span>
                    <span><input type="password" onChange={(e)=>{user.password = e.target.value; setUser({...user})}} name="password" id="password" placeholder="Password" className="text-lg px-5 w-[95%] py-1 text-slate-600 outline-none rounded-md border-2 border-slate-200" /></span>
                </div>
                <div className="flex justify-center mt-3">
                    <button type='submit' className="px-5 py-1 active:bg-red-700 text-lg font-semibold bg-red-700 text-white hover:bg-gray-900 rounded-md">Sign up</button>
                </div>
            </form>
            <div className="mt-3">
                <p className="text-sm text-slate-600 text-center my-1">Already have an account? <Link to={"/login"} className="text-red-700">Login</Link></p>
                <p className="text-sm text-slate-600 text-center my-1">Back to Home Page: <Link to={"/"} className="text-red-700">Our Quotes</Link></p>
            </div>
        </div>
    </div>
    )
}

export default Signup;
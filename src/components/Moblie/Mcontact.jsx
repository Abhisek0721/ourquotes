import Mheader from "./Mheader";
import Mnavbar from "./Mnavbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import axios from "axios";

const Mcontact = ()=>{
    const [contact, setContact] = useState({'fname':'','lname':'','email':'','msg':''});
    const [username, setUsername] = useState(null);
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();

    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            const user = jwtDecode(token);
            if(!user){
                localStorage.removeItem('token');
            }else{
                setUsername(user.username);
            }
        }
    },[]);

    const contactSubmit = (e)=>{
        e.preventDefault();
        axios.post('/contact', contact).then((res)=>{
            if(res.data.msg){
                setMsg(res.data.msg);
                let msgTag = document.getElementById('contact-msg');
                msgTag.classList.remove('hidden');
                setTimeout(()=>{
                    msgTag.classList.add('hidden');
                    navigate('/');
                },3000);
            }
        });
    }

    return (
        <div>
            <Mheader username={username} />
            <div className="mx-10 mt-32 lg:mx-44 lg:mb-20">
                <h1 className="text-2xl font-bold text-center">Contact</h1>

                <p id='contact-msg' className='px-5 py-2 text-sm sm:text-lg text-center rounded-md mt-5 w-[50%] mx-auto text-white bg-green-600 hidden'>{msg}</p>

                <form method="post" onSubmit={contactSubmit} className="flex flex-col justify-center lg:mx-52 mt-10 mb-24">
                    <div className="flex flex-col justify-center w-[100%] lg:flex-row lg:justify-between">
                        <span className="lg:w-[50%] lg:mr-2">
                            <label htmlFor="fname" className="text-xl font-semibold text-slate-600">First Name</label>
                            <input type="text" onChange={(e)=>{contact.fname=e.target.value; setContact({...contact})}} name="fname" id="fname" className="block w-[100%] text-2xl font-semibold text-slate-600 border-2 border-slate-500 rounded-md shadow-md px-5 py-2 outline-none" required />
                        </span>
                        <span className="lg:w-[50%] mt-5 lg:mt-0 lg:ml-2">
                            <label htmlFor="lname" className="text-xl font-semibold text-slate-600">Last Name</label>
                            <input type="text" onChange={(e)=>{contact.lname=e.target.value; setContact({...contact})}} name="lname" id="lname" className="block w-[100%] text-2xl font-semibold text-slate-600 border-2 border-slate-500 rounded-md shadow-md px-5 py-2 outline-none" required />
                        </span>
                    </div>
                    <div className="mt-5">
                        <label htmlFor="email" className="text-xl font-semibold text-slate-600">Email</label>
                        <input type="email" onChange={(e)=>{contact.email=e.target.value; setContact({...contact})}} name="email" id="email" className="block w-[100%] text-2xl font-semibold text-slate-600 border-2 border-slate-500 rounded-md shadow-md px-5 py-2 outline-none" required />
                    </div>
                    <div className="mt-5">
                        <label htmlFor="msg" className="text-xl font-semibold text-slate-600">Message</label>
                        <textarea name="msg" onChange={(e)=>{contact.msg=e.target.value; setContact({...contact})}} id="msg" cols="30" rows="5" className="block w-[100%] text-2xl font-semibold text-slate-600 border-2 border-slate-500 rounded-md shadow-md px-5 py-2 outline-none" required ></textarea>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <button type="submit" className="px-20 lg:w-[90%] py-2 text-lg font-semibold active:bg-red-800 bg-red-700 text-white hover:bg-gray-900 rounded-md">Send</button>
                    </div>
                </form>
            </div>
            <Mnavbar />
        </div>
    );
}

export default Mcontact;
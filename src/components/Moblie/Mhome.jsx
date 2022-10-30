import Mnavbar from "./Mnavbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faPenNib } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../Desktop/Card';
import Mheader from "./Mheader";

const Mhome = ()=>{
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [msg, setMsg] = useState(null);
    const [quotes, setQuotes] = useState(null);

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
        axios.post('/fetch-all-posts').then((res)=>{
            if(res.data){
                setQuotes(res.data.posts);
            }
        });
    },[]);

    const submitPost = (e)=>{
        e.preventDefault();
        if(!username){
            navigate('/login');
        }else{
            if(post){
                axios.post('/create-post', {
                    post: post,
                    token: localStorage.getItem('token')
                }).then((res)=>{
                    if(res.data.msg){
                        setMsg(res.data.msg);
                        let msgTag = document.getElementById('add-post-msg');
                        msgTag.classList.remove('hidden');
                        setPost(null);
                        document.getElementById('post').value = "";
                        setTimeout(()=>{
                            msgTag.classList.add('hidden');
                        },3000);
                    }
                });
            }
        }
    }

    return (
        <div>
            <Mheader username={username} />
            <div className='mx-auto my-32 px-5'>
                <p id='add-post-msg' className='px-5 py-2 text-sm sm:text-lg text-center rounded-md mt-32 w-[50%] mx-auto text-white bg-green-600 hidden'>{msg}</p>
                <header className='w-[100%] flex flex-col justify-center bg-slate-300 rounded-md shadow-md mt-32 pb-10'>
                    <h1 className='my-5 text-2xl text-center font-semibold'>Add New Post</h1>
                    <div className='flex justify-center mt-10 w-[90%] mx-auto'>
                        <FontAwesomeIcon icon={faQuoteLeft} className="text-xl mt-3 mr-3"/>
                        <div className='w-[100%]'>
                            <textarea name="post" id="post" onChange={(e)=>setPost(e.target.value)} placeholder="What's on your mind ?" className='rounded-lg w-[100%] px-5 py-2 min-h-[200px] max-h-[200px] font-semibold text-xl text-slate-600 outline-none border-2 border-slate-100'></textarea>
                        </div>
                    </div>
                    <div className='mx-auto mt-5'>
                        <button onClick={(e)=>submitPost(e)} className='bg-red-700 hover:bg-red-800 active:bg-red-600 text-white text-lg px-10 py-2 float-left rounded-md'><FontAwesomeIcon icon={faPenNib} className="mr-2" />Post</button>
                    </div>
                </header>

                {/* Posts */}
                <div className='mt-20'>
                    <h1 className='mt-32 text-2xl text-center font-semibold'>See Others Quotes</h1>
                    <Card data={[quotes ,username]} />
                </div>
            </div>
            <Mnavbar />
        </div>
    );
}

export default Mhome;
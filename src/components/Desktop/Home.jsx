import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faPenNib } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';

const Home = ()=>{
    const [username, setUsername] = useState(null);

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

    return (
        <div>
            <Navbar />
            <div className='w-[50%] mx-auto mt-20'>
                <header className='w-[100%] flex flex-col justify-center bg-slate-300 rounded-md shadow-md mt-32 pb-10'>
                    <h1 className='my-5 text-2xl text-center font-semibold'>Add New Post</h1>
                    <div className='flex justify-center mt-10'>
                        <FontAwesomeIcon icon={faQuoteLeft} className="text-2xl mt-3 mr-5"/>
                        <div>
                            <textarea name="" id="" placeholder="What's on your mind ?" className='rounded-lg w-[500px] px-5 py-2 min-h-[200px] max-h-[200px] font-semibold text-xl text-slate-600 outline-none border-2 border-slate-100'></textarea>
                        </div>
                    </div>
                    <div className='mx-auto mt-5'>
                        <button className='bg-red-700 hover:bg-red-800 active:bg-red-600 text-white text-lg px-10 py-2 float-left rounded-md'><FontAwesomeIcon icon={faPenNib} className="mr-2" />Post</button>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default Home;
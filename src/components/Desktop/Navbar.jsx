import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBell, faContactCard, faQuoteLeft, faSignIn, faUser } from '@fortawesome/free-solid-svg-icons';
import {useNavigate, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Notifications from './Notifications';

const Navbar = (props) =>{
  const navigate = useNavigate();
  const [numOfNotif, setNumOfNotif] = useState(0);
  
  useEffect(()=>{
    axios.post('/numOfNotif', {username: props.username}).then((res)=>{
      if(res.data.numOfNotif){
        setNumOfNotif(res.data.numOfNotif);
      }
    });
  });

  const logout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }

  const showNotif = ()=>{
    let notif = document.getElementById("notif-box");
    if(notif.classList.contains('hidden')){
      notif.classList.remove('hidden');
    }else{
      notif.classList.add('hidden');
    }
  }

  return (
    <nav className="fixed top-0 w-[100%] bg-white hidden lg:flex justify-between py-4 px-5 border-b-2 border-slate-50 shadow-md">
        <Link to={'/'}>
          <div id="logo" className='flex'>
              <img src={require('../img/logo.png')} width='50' alt="Our Quotes" />
              <h1 className='ml-4 mt-3 text-xl font-bold'>Our Quotes</h1>
          </div>
        </Link>
        <div className='w-[60%] flex'>
          <div className=' flex justify-evenly mt-3 w-[75%]'>
            <Link to={'/'} className='text-xl hover:cursor-pointer hover:text-red-800 active:hover:text-red-600 font-semibold'><FontAwesomeIcon icon={faHome} className="mr-2" />Home</Link>
            <div>
              <div onClick={()=>showNotif()} className='text-xl hover:cursor-pointer hover:text-red-800 active:hover:text-red-600 font-semibold'><FontAwesomeIcon icon={faBell} className="mr-2" />Notifications <span>({numOfNotif})</span></div>
              <div id="notif-box" className="hidden">
                <Notifications username={props.username} />
              </div>
            </div>
            <Link to={''} className='text-xl hover:cursor-pointer hover:text-red-800 active:hover:text-red-600 font-semibold'><FontAwesomeIcon icon={faQuoteLeft} className="mr-2" />Your Quotes</Link>
            <Link to={'/contact'} className='text-xl hover:cursor-pointer hover:text-red-800 active:hover:text-red-600 font-semibold'><FontAwesomeIcon icon={faContactCard} className="mr-2" />Contact Us</Link>
          </div>
          <div className='flex justify-between w-[25%]'>
            {(!props.username)?(
              <>
              <Link to="/login"><button className='text-xl hover:cursor-pointer mt-3 hover:text-red-800 active:hover:text-red-600 font-semibold'><FontAwesomeIcon icon={faSignIn} className="mr-2" />Sign in</button></Link>
              <Link to="/signup"><button className='text-lg hover:cursor-pointer h-10 mt-2 bg-red-700 text-white px-5 rounded-md hover:bg-red-800 active:hover:bg-red-600 font-semibold'>Sign up</button></Link>
              </>
            ):(
              <>
              <button className='text-xl hover:cursor-pointer hover:text-red-800 active:hover:text-red-600 font-semibold'><FontAwesomeIcon icon={faUser} className="mr-2" />{props.username}</button>
              <button onClick={()=>logout()} className='text-lg hover:cursor-pointer h-10 mt-2 bg-red-700 text-white px-5 rounded-md hover:bg-red-800 active:hover:bg-red-600 font-semibold'>Log out</button>
              </>
            )}
          </div>
        </div>
    </nav>
  )
}

export default Navbar;
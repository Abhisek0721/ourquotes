import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBell, faContactCard, faIdCardClip, faSignIn, faUser } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import {useNavigate, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () =>{
  const [username, setUsername] = useState(null);
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

  const logout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <nav className="fixed top-0 w-[100%] flex justify-between py-4 px-5 border-b-2 border-slate-50 shadow-md">
        <a href="">
          <div id="logo" className='flex'>
              <img src={require('../img/logo.png')} width='50' alt="Our Quotes" />
              <h1 className='ml-4 mt-3 text-xl font-bold'>Our Quotes</h1>
          </div>
        </a>
        <div className='w-[60%] flex'>
          <div className=' flex justify-evenly mt-3 w-[75%]'>
            <div className='text-xl hover:cursor-pointer hover:text-red-800 active:hover:text-red-600 font-semibold'><FontAwesomeIcon icon={faHome} className="mr-2" />Home</div>
            <div className='text-xl hover:cursor-pointer hover:text-red-800 active:hover:text-red-600 font-semibold'><FontAwesomeIcon icon={faBell} className="mr-2" />Notifications <span>(2)</span></div>
            <div className='text-xl hover:cursor-pointer hover:text-red-800 active:hover:text-red-600 font-semibold'><FontAwesomeIcon icon={faIdCardClip} className="mr-2" />About</div>
            <div className='text-xl hover:cursor-pointer hover:text-red-800 active:hover:text-red-600 font-semibold'><FontAwesomeIcon icon={faContactCard} className="mr-2" />Contact Us</div>
          </div>
          <div className='flex justify-between w-[25%]'>
            {(!username)?(
              <>
              <Link to="/login"><button className='text-xl hover:cursor-pointer mt-3 hover:text-red-800 active:hover:text-red-600 font-semibold'><FontAwesomeIcon icon={faSignIn} className="mr-2" />Sign in</button></Link>
              <Link to="/signup"><button className='text-lg hover:cursor-pointer h-10 mt-2 bg-red-700 text-white px-5 rounded-md hover:bg-red-800 active:hover:bg-red-600 font-semibold'>Sign up</button></Link>
              </>
            ):(
              <>
              <button className='text-xl hover:cursor-pointer hover:text-red-800 active:hover:text-red-600 font-semibold'><FontAwesomeIcon icon={faUser} className="mr-2" />{username}</button>
              <button onClick={()=>logout()} className='text-lg hover:cursor-pointer h-10 mt-2 bg-red-700 text-white px-5 rounded-md hover:bg-red-800 active:hover:bg-red-600 font-semibold'>Log out</button>
              </>
            )}
          </div>
        </div>
    </nav>
  )
}

export default Navbar;
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const Mheader = (props)=>{
    const [numOfNotif, setNumOfNotif] = useState(0);

    return (
        <header className="w-[100%] bg-white fixed top-0 flex justify-between px-5 py-2 border-b-2 border-slate-50 shadow-md">
            <Link to={'/'}>
                <div id="logo" className='flex'>
                    <img src={require('../img/logo.png')} width='50' alt="Our Quotes" />
                    <h1 className='ml-3 mt-3 text-xl font-bold'>Our Quotes</h1>
                </div>
            </Link>
            <Link to={'/notif'}>
                <FontAwesomeIcon icon={faBell} className="text-2xl mt-3" />
            </Link>
        </header>
    )
}

export default Mheader;
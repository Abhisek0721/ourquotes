import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faQuoteLeft, faDoorOpen, faContactCard } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';

const Mnavbar = ()=>{
    const navigate = useNavigate();
    const logout = ()=>{
        if(localStorage.getItem('token')){
            localStorage.removeItem('token');
        }
        navigate('/login');
    }
    
    return (
        <div className="w-[100%] fixed flex bottom-0 navbar z-10 justify-center md:justify-evenly bg-white border-t-2 border-slate-100" id='navbar'>
            <Link to={'/'}><FontAwesomeIcon id="home" name='' icon={faHome} className="deactive-btn" /></Link>
            <div><FontAwesomeIcon id="your-quotes" name='your-quotes' icon={faQuoteLeft} className="deactive-btn" /></div>
            <Link to={'/contact'}><FontAwesomeIcon id="contact" icon={faContactCard} name='contact' className="deactive-btn" /></Link>
            <div onClick={()=>logout()}><FontAwesomeIcon id="logout" icon={faDoorOpen} name='logout' className="deactive-btn" /></div>
        </div>
    );
}

export default Mnavbar;
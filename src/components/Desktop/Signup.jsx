import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faF, faL, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Signup = ()=>{
    return (
    <div className="my-10 lg:mx-44 lg:my-20">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">Create Account on Davis Blog</h1>
        <form method="post" action="/signup/" className="mt-10 mx-auto bg-slate-200 rounded-lg shadow-md sm:w-[700px] w-[90%] h-[550px]">
            <div className="logo w-[100%] flex justify-center">
                <a className="flex title-font font-medium items-center text-black my-5" href="/">
                    <img src={require('../img/logo.png')} className="w-10 h-10" alt="" />
                    <span className="ml-3 text-xl font-bold">Our Quotes</span>
                </a>
            </div>
            <div className="input-field w-[100%] mt-3">
                <div className="flex py-2 bg-white rounded-md justify-center lg:w-[46%] w-[90%] mx-auto">
                    <span><FontAwesomeIcon icon={faF} className="mx-auto px-2 mt-3 text-lg" /></span>
                    <span><input type="text" name="fname" id="firstname" placeholder="First Name" className="text-lg px-5 w-[95%] py-1 text-slate-600 outline-none rounded-md border-2 border-slate-200" /></span>
                </div>
                <div className="flex py-2 mt-2 bg-white rounded-md justify-center lg:w-[46%] w-[90%] mx-auto">
                    <span><FontAwesomeIcon icon={faL} className="mx-auto px-2 mt-3 text-lg" /></span>
                    <span><input type="text" name="lname" id="lastname" placeholder="Last Name" className="text-lg px-5 w-[95%] py-1 text-slate-600 outline-none rounded-md border-2 border-slate-200" /></span>
                </div>
                <div className="flex py-2 mt-2 bg-white rounded-md justify-center lg:w-[46%] w-[90%] mx-auto">
                    <span><FontAwesomeIcon icon={faUser} className="mx-auto px-2 mt-3 text-lg" /></span>
                    <span><input type="text" name="username" id="username" placeholder="Username" className="text-lg px-5 w-[95%] py-1 text-slate-600 outline-none rounded-md border-2 border-slate-200" /></span>
                </div>
                <div className="flex py-2 mt-2 bg-white rounded-md justify-center lg:w-[46%] w-[90%] mx-auto">
                    <span><FontAwesomeIcon icon={faEnvelope} className="mx-auto px-2 mt-3 text-lg" /></span>
                    <span><input type="email" name="email" id="email" placeholder="Email" className="text-lg px-5 w-[95%] py-1 text-slate-600 outline-none rounded-md border-2 border-slate-200" /></span>
                </div>
                <div className="flex py-2 mt-2 bg-white rounded-md justify-center lg:w-[46%] w-[90%] mx-auto">
                    <span><FontAwesomeIcon icon={faKey} className="mx-auto px-2 mt-3 text-lg" /></span>
                    <span><input type="password" name="password" id="password" placeholder="Password" className="text-lg px-5 w-[95%] py-1 text-slate-600 outline-none rounded-md border-2 border-slate-200" /></span>
                </div>
                <div className="flex justify-center mt-3">
                    <button type="submit" className="px-5 py-1 text-lg font-semibold bg-red-700 text-white hover:bg-gray-900 rounded-md">Sign up</button>
                </div>
            </div>
            <div className="mt-3">
                <p className="text-sm text-slate-600 text-center my-1">Already have an account? <a href="/login" className="text-red-700">Login</a></p>
                <p className="text-sm text-slate-600 text-center my-1">Back to Home Page: <a href="/" className="text-red-700">Our Quotes</a></p>
            </div>
        </form>
    </div>
    )
}

export default Signup;
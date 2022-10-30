import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Desktop/Home";
import Login from "./components/Desktop/Login";
import Signup from "./components/Desktop/Signup";
import Contact from './components/Desktop/Contact';
import Mhome from './components/Moblie/Mhome';
import Mnotifications from './components/Moblie/Mnotifications';
import Mcontact from './components/Moblie/Mcontact';

function App() {

  const mobile = ()=>{
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Mhome />} exact />
            <Route path='/login' element={<Login />} exact />
            <Route path='/signup' element={<Signup />} exact />
            <Route path='/contact' element={<Mcontact />} exact />
            <Route path='/notif' element={<Mnotifications />} exact />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  const desktop = ()=>{
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/login' element={<Login />} exact />
            <Route path='/signup' element={<Signup />} exact />
            <Route path='/contact' element={<Contact />} exact />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  
  return (
    (window.innerWidth<=950)?mobile():desktop()
  );
}


export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Desktop/Home";
import Login from "./components/Desktop/Login";
import Signup from "./components/Desktop/Signup";

function App() {

  const mobile = ()=>{
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/login' element={<Login />} exact />
            <Route path='/signup' element={<Signup />} exact />
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

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/home/Home";
import useAuth from "../hooks/useAuth";
import Login from "../pages/login/Login";

const Private = ({Item}) => {
    const {signed} = useAuth();
    
    return signed > 0 ? <Item /> : <Login />;
}

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/home' element={<Private Item={Home} />} />
                <Route path='/' element={<Login />} />
                {/* <Route exact path='/signup' element={<Signup />} /> */}
                <Route path='*' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
};

export default RoutesApp;
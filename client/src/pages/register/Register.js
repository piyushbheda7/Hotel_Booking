import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterContext } from "../../context/RegisterContex";

import "./register.css";

const Register = () => {

    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
    });


    const { loading, error, dispatch } = useContext(RegisterContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "REGISTER_START" });
        try {
            const res = await axios.post("http://localhost:8800/auth/register", credentials);
            dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
            navigate("/login")
        } catch (err) {
            dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
        }
    };


    return (
        <div className="register">
            <div className="registerContainer">
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={handleChange}
                    className="rInput"
                />
                <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    onChange={handleChange}
                    className="rInput"
                />
                <input
                    type="text"
                    placeholder="Mobile Number"
                    id="number"
                    onChange={handleChange}
                    className="rInput"
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                    className="rInput"
                />
                <button disabled={loading} onClick={handleClick} className="rButton">
                    Register
                </button>
                {error && (error.errors[0]['param'] === 'email' ? <span>Enter A valid Email</span> :
                    error.errors[0]['param'] === 'password' ? <span>Enter A Strong Password</span> :
                    error.errors[0]['param'] === 'number' ? <span> Enter a Valid mobile Number </span> : 
                        <span>User already exit with email or username</span>)}
                <Link to="/login" className="registerlogin"><b>Already User? Login</b></Link>
            </div>
        </div>
    );
};

export default Register;
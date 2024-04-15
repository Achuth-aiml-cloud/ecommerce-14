import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./CSS/LoginSignup.css"; // Make sure the path is correct

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Loggined Successfully");
            navigate('/'); // Redirect to home/admin page on successful login
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <form onSubmit={handleLogin}>
                    <div className="loginsignup-fields">
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </div>
                    <button type="submit">Login</button>
                    <p className="loginsignup-login">Dont Have an Account?! <span onClick={() => navigate('/register')}>Register</span></p>
                </form>
            </div>
        </div>
    );
};

export default Login;

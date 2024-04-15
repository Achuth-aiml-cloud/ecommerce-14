import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./CSS/LoginSignup.css"; // Make sure the path is correct

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Registered Successfully");
            navigate('/'); // Redirect to home/admin page on successful registration
        } catch (error) {
            console.error('Registration Error:', error.message);
        }
    };

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <form onSubmit={handleRegister}>
                    <div className="loginsignup-fields">
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </div>
                    <button type="submit">Register</button>
                    <p className="loginsignup-login">Already Have an Account?! <span onClick={() => navigate('/login')}>Login here</span></p>
                </form>
            </div>
        </div>
    );
}

export default Registration;

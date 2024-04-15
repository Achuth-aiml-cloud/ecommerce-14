import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("User logged in:", userCredential.user);
      localStorage.setItem('auth-token', userCredential.user.accessToken);
      window.location.replace("/");
    } catch (error) {
      alert(error.message);
    }
  }

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("User registered:", userCredential.user);

      // Adding user data to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        // Additional fields can be added here
      });

      localStorage.setItem('auth-token', userCredential.user.accessToken);
      window.location.replace("/");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <div className="loginsignup-fields">
          {!isLogin && <input type="text" placeholder="Your name" name="name" value={formData.name} onChange={changeHandler}/>}
          <input type="email" placeholder="Email address" name="email" value={formData.email} onChange={changeHandler}/>
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={changeHandler}/>
        </div>

        <button onClick={isLogin ? handleLogin : handleSignup}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <div className="loginsignup-switch">
          {isLogin ?
            <p>Create an account? <span onClick={() => setIsLogin(false)}>Sign up here</span></p>
            :
            <p>Already have an account? <span onClick={() => setIsLogin(true)}>Login here</span></p>
          }
        </div>

        <div className="loginsignup-agree">
          <input type="checkbox" name="terms" id="terms" />
          <label htmlFor="terms">By continuing, I agree to the Terms of Use & Privacy Policy.</label>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;

import React, { useState } from "react";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDRl0jZy0S9G5t2rOLmOdwW-Bl82W1CYHs",
    authDomain: "ecommerse-878d4.firebaseapp.com",
    projectId: "ecommerse-878d4",
    storageBucket: "ecommerse-878d4.appspot.com",
    messagingSenderId: "614319687243",
    appId: "1:614319687243:web:5254524447ea50f47a6fce",
    measurementId: "G-6553YFNCY6"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Header = () => {
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Track the logged-in user

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful
        const loggedInUser = userCredential.user;
        setUser(loggedInUser);
        console.log("Login successful", loggedInUser);
      })
      .catch((error) => {
        // Handle login error
        setError(error.message);
      });
  };

  const handleSignup = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signup successful
        const newUser = userCredential.user;
        setUser(newUser);
        console.log("Signup successful", newUser);
      })
      .catch((error) => {
        // Handle signup error
        setError(error.message);
      });
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Logout successful
        setUser(null);
        console.log("Logout successful");
      })
      .catch((error) => {
        // Handle logout error
        console.error("Logout error:", error);
      });
  };

  const toggleAuthMode = () => {
    setIsSignupMode(!isSignupMode);
    setError(null);
    setEmail("");
    setPassword("");
  };

  return (
    <header>
      <nav>
        <ul className="menu-items">
          <li className="menu-item">Home</li>
          <li className="menu-item">Cart</li>
          <li className="menu-item">Contact Us</li>

          <li className="menu-item">
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {isSignupMode ? (
                  <button onClick={handleSignup}>Sign Up</button>
                ) : (
                  <>
                    <button onClick={handleLogin}>Log In</button>
                    <button onClick={toggleAuthMode}>
                      Switch to Sign Up
                    </button>
                  </>
                )}
              </>
            )}
          </li>

          <Cart/>
        </ul>
      </nav>
      {error && <p>{error}</p>}
    </header>
  );
};

export default Header;

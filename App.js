import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [isLoginView, setIsLoginView] = useState(true); // Toggle state

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isLoginView ? 'login' : 'register';
    
    axios.post(`http://localhost:3001/${endpoint}`, {
      username,
      password,
    })
    .then((response) => {
      setStatus(response.data.message);
      if(!isLoginView) setIsLoginView(true); // Move to login after registering
    })
    .catch((error) => {
      setStatus(error.response?.data?.message || "An error occurred");
    });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isLoginView ? "Login" : "Register"}</h2>
        
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        <button type="submit">{isLoginView ? "Login" : "Sign Up"}</button>
        
        <p className="status-msg">{status}</p>

        <p className="toggle-text" onClick={() => {
          setIsLoginView(!isLoginView);
          setStatus(''); // Clear message when switching
        }}>
          {isLoginView ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}

export default App;
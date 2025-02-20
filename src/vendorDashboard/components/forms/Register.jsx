import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { ClipLoader } from "react-spinners";

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Vendor registered successfully");
        showLoginHandler();
      } else {
        alert("Registration Failed, Contact Admin");
      }
    } catch (error) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerSection">
      {loading ? (
        <div className="loaderSection">
          <ClipLoader color="#4fa94d" loading={loading} size={50} />
          <p>Hi, Your Registration is under process...</p>
        </div>
      ) : (
        <form className='authForm' onSubmit={handleSubmit} autoComplete='off'>
          <h3>Vendor Register</h3>
          <label>Username</label>
          <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Email</label>
          <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
          <span className='showPassword' onClick={handleShowPassword}>{showPassword ? 'Hide' : 'Show'}</span>
          <div className="btnSubmit">
            <button type='submit'>Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;

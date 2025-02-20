import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { ClipLoader } from "react-spinners";

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('loginToken', data.token);
        showWelcomeHandler();
        window.location.reload();
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginSection">
      {loading ? (
        <div className="loaderSection">
          <ClipLoader color="#4fa94d" loading={loading} size={50} />
          <p>Login in process... Please wait</p>
        </div>
      ) : (
        <form className='authForm' onSubmit={loginHandler} autoComplete='off'>
          <h3>Vendor Login</h3>
          <label>Email</label>
          <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type={showPassword ? "text" : "password"} name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <span className='showPassword' onClick={handleShowPassword}>{showPassword ? 'Hide' : 'Show'}</span>
          <div className="btnSubmit">
            <button type='submit'>Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;

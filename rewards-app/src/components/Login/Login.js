import React from 'react';
import './Login.css';

function Login(props) {

  const submitLogin = () => {
    var u = document.getElementById('username-input').value;
    var p = document.getElementById('password-input').value;
    props.attemptLogin(u,p);
  };

  const onKeyPress = event => {
    if (event.key === 'Enter') {
        submitLogin();
    }
}

  return (
    <div id="login-comp" className="login-container">
        <h3>Log in to view your rewards!</h3>
        <p id="auth-fail-p">Login Failed. Please try again.</p>
        <input id="username-input" type="text" placeholder="username" onKeyPress={onKeyPress}></input>
        <input id="password-input" type="password" placeholder="password" onKeyPress={onKeyPress}></input>
        <button onClick={submitLogin}>Login</button>
    </div>
  );
}

export default Login;

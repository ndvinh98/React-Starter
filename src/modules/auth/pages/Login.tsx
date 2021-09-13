import React from 'react';

function Login() {
  return (
    <div>
      This is login page
      <button onClick={() => localStorage.setItem('token', '123123')}>
        Login
      </button>
    </div>
  );
}

export default Login;

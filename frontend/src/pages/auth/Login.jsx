import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if(!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if(!password){
        setError("Please enter the password.");
        return;
    }

    setError("");
    
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });
      const {token, user} = response.data;
      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      } else{
        setError("Something went wrong. Please try again later.");
      }
    }
  }

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-stormy-500 dark:text-alice-500">
            Welcome Back
        </h3>
        <p className="text-sm text-stormy-300 dark:text-pearl-600 mt-2 mb-8 font-medium">
          Please enter your details to login
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            type="email"
            placeholder="john@example.com"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            type="password"
            placeholder="••••••••"
          />

          {error && <p className='text-tangerine-500 text-xs pb-2.5 font-medium'>{error}</p>}

          <button
            type="submit"
            className="btn-primary"
          >
            Login
          </button>

          <p className='text-[13px] text-stormy-400 dark:text-pearl-600 mt-4 text-center'>
            Don't have an account?{' '}
            <Link className='font-bold text-stormy-500 hover:text-stormy-700 dark:text-alice-500 dark:hover:text-pearl-400 underline transition-colors' to='/SignUp'>
                Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
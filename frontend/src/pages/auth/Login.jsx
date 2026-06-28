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
        navigate("/Dashboard");
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
      <div className="glass-card rounded-2xl p-8 sweep-effect shadow-2xl">
        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            icon="mail"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            type="password"
            placeholder="••••••••"
            icon="lock"
          />

          {error && <p className='text-error text-label-sm font-medium'>{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary text-on-primary font-title-md text-title-md py-4 rounded-xl neon-glow-primary transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            Login
            <span className="material-symbols-outlined">login</span>
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-on-surface-variant font-body-md">
            Don't have an account?{' '}
            <Link 
              className='text-primary font-bold hover:text-primary-container transition-colors ml-1' 
              to='/SignUp'
            >
                Sign Up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

const AuthForm = ({ onAuth }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onAuth(isSignup ? 'signup' : 'login', email, password, company);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">{isSignup ? 'Sign Up' : 'Login'}</h2>
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        {isSignup && (
          <Input type="text" placeholder="Company Name" value={company} onChange={e => setCompany(e.target.value)} />
        )}
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit" text={isSignup ? 'Sign Up' : 'Login'} />
        <p className="text-sm mt-4 text-center">
          {isSignup ? 'Already have an account?' : 'New here?'}{' '}
          <span className="text-blue-500 cursor-pointer" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;

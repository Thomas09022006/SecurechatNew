// src/components/Button.js

import React from 'react';

const Button = ({ text, onClick, type = 'button', disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-2 rounded transition font-semibold 
      ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
  >
    {text}
  </button>
);

export default Button;

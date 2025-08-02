// src/components/ChatRoom.js

import React, { useState } from 'react';
import Button from './Button';

const ChatRoom = ({ messages, onSend, onLeave, userEmail }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() !== '') {
      onSend(text);
      setText('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-blue-600 text-white shadow">
        <h2 className="text-lg font-semibold">Secure Chat Room</h2>
        <button
          onClick={onLeave}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Leave
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded w-fit max-w-[75%] break-words ${
              msg.sender_email === userEmail
                ? 'bg-blue-500 text-white ml-auto'
                : 'bg-gray-200 text-black mr-auto'
            }`}
          >
            <div className="text-xs text-gray-100 mb-1">{msg.sender_email}</div>
            <div>{msg.text}</div>
            <div className="text-xs text-gray-300 text-right mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white flex gap-2 border-t border-gray-200">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <Button text="Send" onClick={handleSend} />
      </div>
    </div>
  );
};

export default ChatRoom;

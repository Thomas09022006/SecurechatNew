import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

const Dashboard = ({
  onCreate,
  onJoin,
  createdRoomId,
  createdRoomPassword,
  onEnterChat
}) => {
  const [partnerEmail, setPartnerEmail] = useState('');
  const [roomId, setRoomId] = useState('');
  const [roomPassword, setRoomPassword] = useState('');

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-50 px-4">

      {/* Create Room */}
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Create New Chat Room</h2>
        <Input
          type="email"
          placeholder="Partner's Email"
          value={partnerEmail}
          onChange={e => setPartnerEmail(e.target.value)}
        />
        <Button text="Create Room" onClick={() => onCreate(partnerEmail)} />

        {/* Show created Room ID and Password */}
        {createdRoomId && createdRoomPassword && (
          <div className="mt-4 p-4 border rounded bg-green-100 text-center">
            <p><strong>Room ID:</strong> {createdRoomId}</p>
            <p><strong>Password:</strong> {createdRoomPassword}</p>
            <Button text="Enter Chatroom" onClick={onEnterChat} />
          </div>
        )}
      </div>

      {/* Join Room */}
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Join Existing Room</h2>
        <Input
          placeholder="Room ID"
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Room Password"
          value={roomPassword}
          onChange={e => setRoomPassword(e.target.value)}
        />
        <Button text="Join Room" onClick={() => onJoin(roomId, roomPassword)} />
      </div>
    </div>
  );
};

export default Dashboard;

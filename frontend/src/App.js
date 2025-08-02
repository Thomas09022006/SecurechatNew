import React, { useState, useEffect } from 'react';
import { signup, login, createRoom, joinRoom, sendMessage, getMessages } from './api';
import { mockCrypto } from './mockCrypto';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import ChatRoom from './components/ChatRoom';

const App = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('auth');
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);

  const handleAuth = async (type, email, password, company) => {
    const otp = '123456';
    if (prompt(`OTP: ${otp}`) !== otp) {
      alert('Invalid OTP');
      return;
    }
    try {
      const res = type === 'signup'
        ? await signup(email, password, company)
        : await login(email, password);
      setUser(res.data);
      setView('dashboard');
      alert(`${type === 'signup' ? 'Signed up' : 'Logged in'}`);
    } catch (e) {
      alert(e.response?.data?.error || 'Error');
    }
  };

  const handleCreate = async partnerEmail => {
    try {
      const res = await createRoom(user.email, partnerEmail);
      setCurrentRoom(res.data);    // ✅ Store room but don’t enter yet
      setMessages([]);
      alert('Room created! Share the Room ID and Password with your partner.');
    } catch (e) {
      const errMsg = e.response?.data?.error || e.message || "Unknown error";
      alert(errMsg);
    }
  };

  const handleJoin = async (id, pwd) => {
    try {
      const res = await joinRoom(id, pwd, user.email);
      const joinedRoom = {
        room_id: res.data.room_id,
        password: res.data.password
      };
      setCurrentRoom(joinedRoom);
      setMessages([]);
      setView('chatroom');    // ✅ Automatically enter on join
    } catch (e) {
      alert('Invalid Room ID or Password');
    }
  };

  const enterChat = () => {
    if (!currentRoom) {
      alert("No room created or joined.");
      return;
    }
    setView('chatroom');
  };

  const fetchMessages = async () => {
    if (!currentRoom) return;
    const res = await getMessages(currentRoom.room_id);
    setMessages(res.data.map(m => ({
      ...m,
      text: mockCrypto.AES.decrypt(m.text),
      isVerified: m.is_verified
    })));
  };

  useEffect(() => {
    const intv = setInterval(fetchMessages, 2000);
    return () => clearInterval(intv);
  }, [currentRoom]);

  const handleSend = async msg => {
    const encrypted = mockCrypto.AES.encrypt(msg);
    await sendMessage(currentRoom.room_id, user.email, user.socket_id, encrypted);
    setMessages(prev => [
      ...prev,
      {
        sender_email: user.email,
        text: msg,
        timestamp: new Date().toISOString(),
        isVerified: true
      }
    ]);
  };

  if (view === 'auth') return <AuthForm onAuth={handleAuth} />;

  if (view === 'dashboard')
    return (
      <Dashboard
        onCreate={handleCreate}
        onJoin={handleJoin}
        createdRoomId={currentRoom?.room_id || ''}
        createdRoomPassword={currentRoom?.password || ''}
        onEnterChat={enterChat}
      />
    );

  if (view === 'chatroom')
    return (
      <ChatRoom
        messages={messages}
        onSend={handleSend}
        onLeave={() => setView('dashboard')}
        userEmail={user.email}
      />
    );

  return null;
};

export default App;

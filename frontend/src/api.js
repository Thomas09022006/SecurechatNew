import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

export const signup = (email, password, company) =>
  axios.post(`${BASE}/signup/`, { email, password, company });

export const login = (email, password) =>
  axios.post(`${BASE}/login/`, { email, password });

export const createRoom = (email, partner_email) =>
  axios.post(`${BASE}/create-room/`, { email, partner_email });

export const joinRoom = (room_id, password, email) =>
  axios.post(`${BASE}/join-room/`, { room_id, password, email });

export const sendMessage = (room_id, sender_email, sender_socket_id, text) =>
  axios.post(`${BASE}/send-message/`, { room_id, sender_email, sender_socket_id, text });

export const getMessages = (room_id) =>
  axios.get(`${BASE}/get-messages/${room_id}/`);

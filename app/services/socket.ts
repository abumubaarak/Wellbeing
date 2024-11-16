import {io} from 'socket.io-client';

const socket = io('https://wellbeing-chat-production.up.railway.app');

// const socket = io('https://1e7a-197-211-58-127.ngrok-free.app');

export default socket;

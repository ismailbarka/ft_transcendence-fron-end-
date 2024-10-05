
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsconnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access')
    const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/?token=${token}`);

    newSocket.onopen = () => {
      console.log('WebSocket Connected');
      setIsconnected(newSocket)
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      receive_message(data);
    };

    newSocket.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (message, receiver_id) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ 
        type:"chat_message",
        message:message, 
        receiver_id:receiver_id }));
    } else {
      console.error('WebSocket is not connected');
    }
  };
  const receive_message = (data) => {
    setMessages(prevMessages => ({
      ...prevMessages,
      [data.sender_id]: [...(prevMessages[data.sender_id] || []), data]
    }));
  };
  return (
    <WebSocketContext.Provider value={{messages,sendMessage, setMessages }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
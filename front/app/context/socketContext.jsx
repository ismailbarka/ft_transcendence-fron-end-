'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/?token=${accessToken}`);

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (receiverId, message) => {
    if (socket) {
      socket.send(JSON.stringify({ receiver_id: receiverId, message }));
    }
  };

  const getConversation = (userId) => {
    // This should be implemented to retrieve the conversation from your state management
    // For now, it returns an empty array
    return [];
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, getConversation }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
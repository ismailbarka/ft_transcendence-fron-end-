'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState({});

  const connect = (token) => {
    const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/?token=${token}`);

    newSocket.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnected(true);
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleIncomingMessage(data);
    };

    newSocket.onclose = () => {
      console.log('WebSocket Disconnected');
      setIsConnected(false);
    };

    setSocket(newSocket);
  };

  useEffect(() => {
    let reconnectTimeout;
  
    const setupReconnect = () => {
      if (!isConnected) {
        reconnectTimeout = setTimeout(() => {
          const token = localStorage.getItem('access');
          if (token) connect(token);
        }, 5000); // 7awel reconnection kol 5 secondes
      }
    };
  
    setupReconnect();
  
    return () => {
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, [isConnected]);

  const handleIncomingMessage = (data) => {
    if (data.type === 'chat_message') {
      setMessages(prevMessages => ({
        ...prevMessages,
        [data.sender_id]: [...(prevMessages[data.sender_id] || []), data]
      }));
    } else if (data.type === 'conversation_history') {
      setMessages(prevMessages => ({
        ...prevMessages,
        [data.friend_id]: data.messages
      }));
    }
  };

  const sendMessage = (message) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  };

  const getConversation = (friendId) => {
    if (socket && isConnected) {
      sendMessage({
        type: 'get_conversation',
        friend_id: friendId
      });
    } else {
      console.error('WebSocket is not connected');
    }
    return messages[friendId] || [];
  };

  const value = {
    isConnected,
    socket,
    connect,
    sendMessage,
    getConversation,
    messages
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
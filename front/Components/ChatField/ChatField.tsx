'use client';
import React, { use, useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import EmojiPicker from 'emoji-picker-react';
import { useWebSocket } from '../../app/context/socketContext';
import classes from './chatField.module.css';
import avatar from '../../public/chat/avatar.png';
import emoji from '../../public/chat/emoji.png';
import axios from 'axios';
import { get } from 'http';

export const ChatField = ({ userdata, friend }) => {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const endRef = useRef(null);
  const { socket, isconnected, connect, addMessageListener, getConversation } = useWebSocket();
  const token = localStorage.getItem('access');
  useEffect(() => {
    axios.get(`http://localhost:8000/api/get_conversation/${userdata.UserData.id}/${friend.id}/`,
    { headers: { Authorization: `Bearer ${token}` }})
    .then((response) => {
      setMessages(response.data.messages);
    })
  },[friend.id]);
  useEffect(() => {
    if (!isconnected) {
      connect(token);
    }
  }, [isconnected, token]);
  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    if (isconnected) {
      const removeListener = addMessageListener(handleNewMessage);
      return () => removeListener();
    }
  }, [isconnected, addMessageListener]);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  // testtinng **********************//



  useEffect(() => {
    console.log('isconnected', isconnected);
    if (isconnected) {
      socket.onmessage((event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'chat_message') {
          setMessages((prevMessages) => [...prevMessages, data]);
        }
      });
    
    }

  },[isconnected]);




  // *******************************//

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };
  const handleSendMessage = () => {
    if (text.trim()) {
      socket.send(JSON.stringify({ 
        type: 'chat_message',
        receiver_id: friend.id,
        message: text}));
      setText("");
    }
  };
  return (
    <div className={classes.ChatField}>
      <div className={classes.top}>
        <div className={classes.user}>
          <Image alt='' src={avatar} className={classes.img} />
          <div className={classes.texts}>
            <span className={classes.span}>{friend.username}</span>
            <p className={classes.desc}>{friend.discription}</p>
          </div>
        </div>
      </div>
      <div className={classes.center}>
        {messages.map((message, index) => (
          <div key={index} className={message.sender === userdata.UserData.username ? classes.messageOwn : classes.message}>
            {message.sender != userdata.UserData.username ?<Image alt='' src={message.sender_avatar || avatar} className={classes.messangerProfile} />:null}
            <div className={classes.texts}>
              <p className={classes.pa}>{message.content}</p>
              <span className={classes.date}>{new Date(message.timestamp).toLocaleString()}</span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className={classes.bottom}>
        <input
          type='text'
          placeholder='type a message...'
          className={classes.msgInput}
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <div className={classes.emoji}>
          <Image alt='' src={emoji} className={classes.imagesButton} onClick={() => setOpen(!open)} />
          <div className={classes.picker}>
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className={classes.sendButton} onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};
import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import { useWebSocket } from '../../app/context/socketContext'; // Import the WebSocket hook
import classes from './chatField.module.css';
import avatar from '../../public/chat/avatar.png';
import emoji from '../../public/chat/emoji.png';

export const ChatField = ({ userdata, friend }) => {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const { sendMessage, getConversation } = useWebSocket(); // Use the WebSocket hook
  const endRef = useRef(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    axios.get(`http://localhost:8000/api/get_conversation/${userdata.UserData.id}/${friend.id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then((response) => {
      setMessages(response.data.messages);
    })
    .catch((error) => {   
      console.log(error);
    });
  }, [friend, userdata]);

  useEffect(() => {
    // Update messages when the conversation changes
    const conversation = getConversation(friend.id);
    setMessages((prevMessages) => [...prevMessages, ...conversation]);
  }, [friend.id, getConversation]);

  useEffect(() => {
    // Scroll to bottom when messages update
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSendMessage = () => {
    if (text.trim()) {
      sendMessage(friend.id, text);
      setText("");
      // Optionally, you can add the message to the local state immediately for a faster UI update
      setMessages((prev) => [...prev, { sender: userdata.UserData.username, content: text, timestamp: new Date().toISOString() }]);
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
          <div key={index} className={message.sender === userdata.UserData.username ? classes.message : classes.messageOwn}>
            <Image alt='' src={message.sender.avatar || avatar} className={classes.messangerProfile} />
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
          onClick={(e) => e.key === 'Enter' && handleSendMessage()}
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
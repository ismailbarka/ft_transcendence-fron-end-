"use client"
import React, { useEffect, useRef, useState } from 'react'
import classes from './chatField.module.css'
import Image from 'next/image'
import avatar from '../../public/chat/avatar.png'
import phone from '../../public/chat/phone.png'
import video from '../../public/chat/video.png'
import info from '../../public/chat/info.png'
import emoji from '../../public/chat/emoji.png'
import mic from '../../public/chat/mic.png'
import camera from '../../public/chat/camera.png'
import img from '../../public/chat/img.png'
import EmojiPicker from 'emoji-picker-react'
import axios from 'axios'


export const ChatField = ({ FriendId }) => {
  const [messages, setMessages] = useState([]);
  const [friend, setFriend] = useState({});
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [ws, setWs] = useState(null);

  const endRef = useRef(null);

  useEffect(() => {
    const userme = localStorage.getItem('id');
    const accessToken = localStorage.getItem('access');
    axios.get(`http://localhost:8000/api/get_conversation//${FriendId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then((response) => {
      setMessages(response.data.messages);
      console.log(response.data.messages);
      setFriend(response.data.friend);
    })
    .catch((error) => {
      console.log(error);
    });

    const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/${FriendId}/`);
    setWs(chatSocket);

    chatSocket.onmessage = function(e) {
      const data = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    chatSocket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly');
    };

    return () => {
      chatSocket.close();
    };
  }, [FriendId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (ws && text.trim()) {
      ws.send(JSON.stringify({
        'message': text,
        'sender_id': 1,  
        'receipient_id': FriendId  
      }));
      setText("");
    }
  };

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <div className={classes.ChatField}>
      <div className={classes.top}>
        <div className={classes.user}>
          <Image alt='' src={avatar} className={classes.img} />
          <div className={classes.texts}>
            <span className={classes.span}>Ismail barka</span>
            <p className={classes.desc}>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>
      {/* fix the styling when no message is sent */}
      <div className={classes.center}>
        {messages.map((message, index) => (
          <div key={index} className={classes.message}>
            <Image alt='' src={avatar} className={classes.messangerProfile} />
            <div className={classes.texts}>
              <p className={classes.pa}>{message.message}</p>
              <span className={classes.date}>{message.timestamp}</span>
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
        />
        <div className={classes.emoji}>
          <Image alt='' src={emoji} className={classes.imagesButton} onClick={() => setOpen(!open)} />
          <div className={classes.picker}>
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button onClick={sendMessage} className={classes.sendButton}>Send</button>
      </div>
    </div>
  );
};

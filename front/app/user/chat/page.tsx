"use client"
import React, {
  useState,
  useContext,
  useEffect
} from 'react'
import classes from './chat.module.css'
import Image from 'next/image'
import searchImage from '../../../public/Search icon.svg'
import {
  ChatList
} from '@/Components/ChatList/ChatList'
import {
  ChatField
} from '@/Components/ChatField/ChatField'
import {
  ChatDetails
} from '@/Components/ChatDetails/ChatDetails'
import {
  useRouter
} from 'next/navigation'
import avatar from '../../../public/chat/avatar.png'
import {
  UserContext
} from '../../context/UserContext'


const Chat = () => {
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const [friend, onSelectFriend] = useState({
    TFA: false,
    avatar: "",
    first_name: "",
    id: null,
    last_name: "",
    lastmessagesender: "",
    password: "",
    username: "",
  });
  const userData = useContext(UserContext);
  useEffect(() => {
    // updateCurrentPage("Chat");
    const access = localStorage.getItem("access");
    if (!access)
      router.push("/login");
  }, []);
  return (
    <div className={classes.body}>
      <div className = {classes.chat} >
      <div className = {classes.ChatList} ><ChatList userdata = {userData} onSelectFriend = {onSelectFriend}/> </div> 
      {friend.id!=null?<div className={classes.ChatField}>
        <ChatField userdata={userData} friend={friend} showDetails={showDetails} />
      </div>:<></>}
      {friend.id!=null?
      <div className={classes.ChatDetails}>
        <ChatDetails friend={friend} />
      </div>:<></>}
      </div>
    </div>
  )
}

export default Chat
"use client"
import React, { useState } from 'react'
import classes from './Menu.module.css'
import Image from 'next/image'
import homeImage from "../../public/homeIcon.svg"
import chatImage from "../../public/chatIcon.svg"
import gameImage from "../../public/racketicon.svg"
import friendsImage from "../../public/friendsIcon.svg"
import placeImage from "../../public/placeIcon.svg"
import settingsImage from "../../public/settingsIcon.svg"
import logoutImage from "../../public/logoutIcon.svg"
import Link from 'next/link'

interface Choice{
  name: string;
  imageUrl: string
}

const choices: Choice[] = [{
  name : "Home",
  imageUrl : homeImage
},
{
  name : "Chat",
  imageUrl : chatImage
},
{
  name : "Game",
  imageUrl : gameImage
},
{
  name : "Friends",
  imageUrl : friendsImage
},
{
  name : "Place",
  imageUrl : placeImage
},
{
  name : "Settings",
  imageUrl : settingsImage
},
{
  name : "Logout",
  imageUrl : logoutImage
}];



const Menu: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>("home");
  
  const handleClick = (name: string) =>{
    setSelectedPage(name);
    console.log('====================================');
    console.log(name);
    console.log('====================================');
  }
  
  const path = (page:string):string =>{
    return "/user/" + page.toLowerCase();
  }

  return (
    <div className={classes.container}>
      <div className={classes.buttons1}>
        {choices.map((item, index) =>{
          return <Link href={"/user/" + item.name.toLowerCase()} key={index} className={selectedPage != item.name ? classes.button : classes.buttonSlelected} onClick={() => handleClick(item.name)}>
                    <div className={classes.imgContainer}>
                      <Image src={item.imageUrl} alt={item.name} className={classes.img} width={30} height={30}></Image>
                    </div>
                    <h2 className={classes.title}>{item.name}</h2>
                  </Link>
        })}
      </div>
    </div>
  )
}

export default Menu

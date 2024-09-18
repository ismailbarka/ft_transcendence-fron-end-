"use client"
<<<<<<< HEAD
import React, { useState } from 'react'
import classes from './Menu.module.css'
import Image from 'next/image'
import homeImage from "../../public/homeIcon.svg"
import chatImage from "../../public/chatIcon.svg"
// import gameImage from "../../public/racketicon.svg"
import friendsImage from "../../public/friendsIcon.svg"
import placeImage from "../../public/placeIcon.svg"
import settingsImage from "../../public/settingsIcon.svg"
import logoutImage from "../../public/logoutIcon.svg"
import Link from 'next/link'
=======
import React, { useContext, useState } from 'react';
import classes from './Menu.module.css';
import Image from 'next/image';
import homeImage from "../../public/homeIcon.svg";
import chatImage from "../../public/chatIcon.svg";
import gameImage from "../../public/racketicon.svg";
import friendsImage from "../../public/friendsIcon.svg";
import placeImage from "../../public/placeIcon.svg";
import settingsImage from "../../public/settingsIcon.svg";
import logoutImage from "../../public/logoutIcon.svg";
import Link from 'next/link';
import { UserContext } from '@/app/context/UserContext';
>>>>>>> main

interface Choice {
  name: string;
  imageUrl: string;
}

<<<<<<< HEAD
const choices: Choice[] = [{
  name : "Home",
  imageUrl : homeImage
},
{
  name : "Chat",
  imageUrl : chatImage
},
// {
//   name : "Game",
//   imageUrl : gameImage
// },
{
  name : "LeaderBoard",
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


=======
const choices: Choice[] = [
  { name: "Home", imageUrl: homeImage },
  { name: "Chat", imageUrl: chatImage },
  { name: "Game", imageUrl: gameImage },
  { name: "LeaderBoard", imageUrl: placeImage },
  { name: "Settings", imageUrl: settingsImage },
  { name: "Logout", imageUrl: logoutImage }
];
>>>>>>> main

const Menu: React.FC = () => {
  const { currentPage,updateCurrentPage } = useContext(UserContext);
  const [selectedPage, setSelectedPage] = useState<string>("Home");

  const handleClick = (name: string) => {
    updateCurrentPage(name);
  }

  return (
    <div className={classes.container}>
      <div className={classes.buttons1}>
        {choices.map((item, index) => (
          <Link
            href={"/user/" + item.name.toLowerCase()}
            key={index}
            className={currentPage !== item.name ? classes.button : classes.buttonSelected}
            onClick={() => handleClick(item.name)}
          >
            <div className={classes.imgContainer}>
              <Image src={item.imageUrl} alt={item.name} className={classes.img} width={30} height={30} />
            </div>
            <h2 className={classes.title}>{item.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Menu;

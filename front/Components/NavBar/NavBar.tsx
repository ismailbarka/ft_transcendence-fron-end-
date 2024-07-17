import React from 'react'
import classes from './navBar.module.css'
import Image from 'next/image'
import mainLogo from '../../public/Main Logo.svg'
searchImage

const NavBar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <Image src={mainLogo} alt='' className={classes.logoImage}/>
        <h1 className={classes.title}>title</h1>
      </div>
      <div className={classes.search}>
        <input placeholder="FIND NEW FRIENDS" className={classes.input}></input>
        <Image alt="te" className={classes.imageStyle} src={searchImage} width={20} height={20}></Image>
      </div>
      <div className={classes.icons}></div>
      <div className={classes.profile}></div>

    </div>
  )
}

export default NavBar

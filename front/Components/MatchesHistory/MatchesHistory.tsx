import React from 'react'
import classes from './matchesHistory.module.css'
import achieImage from '../../public/achie.svg'
import Image from 'next/image'
    const achies = [{
        title: "Achievement Name",
        desc: "Achievement Description",
        imgUrl: achieImage
    },{
        title: "Achievement Name",
        desc: "Achievement Description",
        imgUrl: achieImage
    },{
        title: "Achievement Name",
        desc: "Achievement Description",
        imgUrl: achieImage
    },{
        title: "Achievement Name",
        desc: "Achievement Description",
        imgUrl: achieImage
    },{
        title: "Achievement Name",
        desc: "Achievement Description",
        imgUrl: achieImage
    },{
        title: "Achievement Name",
        desc: "Achievement Description",
        imgUrl: achieImage
    },{
        title: "Achievement Name",
        desc: "Achievement Description",
        imgUrl: achieImage
    },{
        title: "Achievement Name",
        desc: "Achievement Description",
        imgUrl: achieImage
    },{
        title: "Achievement Name",
        desc: "Achievement Description",
        imgUrl: achieImage
    }
]

export const MatchesHistory = () => {
  return (
    <div className={classes.Achivements}>
        <h1 className={classes.title1}>MatchesHistory</h1>
        <div className={classes.achieContainer1}>
            {achies.map((item, index) =>{
                return  <div className={classes.Online} key={index}>
                            <Image src={item.imgUrl} alt="" width={70} height={70} className={classes.image}/>
                            <div className={classes.nameAndMsg}>
                                <h3 className={classes.name}>Online: {item.title}</h3>
                                <p className={classes.message}>Online:{item.desc}</p>
                        </div>
                </div>
            })}
        </div>
    </div>
  )
}
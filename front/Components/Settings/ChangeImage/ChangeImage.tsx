import Image from "next/image"
import avatar from '../../../public/chat/avatar.png'
import classes from './changeImage.module.css'
import ImageUpload from "./ImageUpload"
import { useContext, useEffect, useState } from "react"
import loadMyData from "@/Components/LoadMyData"
import { UserContext } from "@/app/context/UserContext"

const ChangeImage = ({setCurrentPage}) => {
    const {UserData, updateUserData} = useContext(UserContext);


    
    return (
        <div>
            <ImageUpload setCurrentPage={setCurrentPage}/>
        </div>
    )
}

export default ChangeImage

"use client"
import React, {useContext, useState} from "react";
import {Image} from 'cloudinary-react'
import { UserContext } from "@/app/context/UserContext";

const ImageUpload = () =>{


    const {UserData ,updateUserData} = useContext(UserContext);

    const uploadImage = async (e) =>{
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append("upload_preset", "estate");

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/doufu6atn/image/upload`,
            {
                method: 'POST',
                body: data
            }
        );
        const file = await res.json();
        updateUserData({...UserData, avatar: file.secure_url});

    };

    return (
        <div>
            <input type="file" name="file" placeholder="Upload an Image" onChange={uploadImage} />
            {UserData.avatar &&(
                <div>
                    <Image cloudName="doufu6atn" publicId={UserData.avatar}></Image>
                </div>
            )}
        </div>
    );
};
export default ImageUpload;
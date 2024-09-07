"use client";
import React, { useContext, useEffect, useState } from "react";
import { Image as CloudinaryImage } from "cloudinary-react";
import { UserContext } from "@/app/context/UserContext";
import classes from "./imageUpload.module.css";
import loadMyData from "@/Components/LoadMyData";
import NextImage from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

const ImageUpload = ({ setCurrentPage }) => {
  const { UserData, updateUserData } = useContext(UserContext);
  const [oldImage, setOldImage] = useState<string>("");
  const [newImage, setNewImage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      try {
        if (!UserData.first_name) {
          const res = await loadMyData(localStorage.getItem("access"),localStorage.getItem("refresh"), updateUserData);
          if(res !== 0)
            router.push("/login");
        }
        setOldImage(UserData.avatar);
      } catch (err) {
        console.error("Failed to load user data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [UserData]);

  const validateImage = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 2 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setError("Invalid file type. Only JPG, PNG, and GIF are allowed.");
      return false;
    }

    if (file.size > maxSize) {
      setError("File size exceeds 2MB.");
      return false;
    }

    setError("");
    return true;
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (!validateImage(file)) return;

      setIsLoading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "estate");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/doufu6atn/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const fileData = await res.json();
        setNewImage(fileData.secure_url);
      } catch (err) {
        console.error("Error uploading image:", err);
        setError("Failed to upload image. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChangeAvatar = async () => {
    if (!newImage) {
      setError("Please upload a new image first.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/users/me/",
        {
          avatar: newImage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      updateUserData({ ...UserData, avatar: newImage });
      setCurrentPage("");
    } catch (err) {
      console.error("Error updating user data:", err);
      setError("Failed to update avatar. Please try again.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className={classes.NotifNotif}>
      <div className={classes.window}>
        <div className={classes.element}>
          <label className={classes.label}>Old Avatar:</label>
          {oldImage && (
            <NextImage alt="Old Avatar" src={oldImage} width={100} height={100} />
          )}
          <label className={classes.label}>New Avatar:</label>
          <input
            type="file"
            name="file"
            placeholder="Upload an Image"
            onChange={uploadImage}
            disabled={isLoading}
          />
          {newImage ? (
            <NextImage alt="New Avatar" src={newImage} width={100} height={100} />
          ) : (
            <NextImage alt="New Avatar" src="/player.png" width={100} height={100} />
          )}
          {error && <span className={classes.error}>{error}</span>}
          <div className={classes.buttonContainer}>
            <button
              className={classes.button}
              onClick={handleChangeAvatar}
              disabled={isLoading || !newImage}
            >
              {isLoading ? "Updating..." : "Update Infos"}
            </button>
            <button
              className={classes.button}
              onClick={() => setCurrentPage("")}
              disabled={isLoading} 
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;

import axios from "axios";
import { UserContext } from "@/app/context/UserContext";
import { useContext } from "react";

const loadMyData = async (access, updateUserData) =>{

    console.log(`Bearer ${access}`);
    console.log("test");
    
      try {
        const res = await axios.get("http://localhost:8000/api/users/me/", {
          headers: {
            Authorization: `Bearer ${access}`, 
          },
        });
        updateUserData({id: res.data.id, username: res.data.username ,avatar: res.data.avatar ,first_name: res.data.first_name, last_name: res.data.last_name})
  
       } catch (err) {
        console.error("Error response:", err); 
      }
  }

export default loadMyData;
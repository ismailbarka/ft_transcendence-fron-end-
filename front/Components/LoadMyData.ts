import axios from "axios";
import { UserContext } from "@/app/context/UserContext";
import { useContext } from "react";

const loadMyData = async () =>{

  const access = localStorage.getItem("access");
  const {updateUserData} = useContext(UserContext);
    console.log(`Bearer ${access}`);
    console.log("test");
    
      try {
        const res = await axios.get("http://localhost:8000/api/users/me/", {
          headers: {
            Authorization: `Bearer ${access}`, 
          },
        });
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("first_name", res.data.first_name);
        localStorage.setItem("last_name", res.data.last_name);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("avatar", res.data.avatar);
        updateUserData({id: res.data.id, username: res.data.username ,avatar: res.data.avatar ,first_name: res.data.first_name, last_name: res.data.last_name})
  
       } catch (err) {
        console.error("Error response:", err); 
      }
  }

export default loadMyData;
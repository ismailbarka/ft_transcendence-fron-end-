import { createContext, useEffect, useState } from "react";


export const UserContext = createContext();

export const UserContextProvider = ({children}) =>{
    const [UserData, setUserData] = useState(
        {
            "id": null,
            "username": "",
            "avatar": "",
            "first_name": "",
            "last_name": ""
        });

        const updateUserData = (data) =>{
            setUserData(data);
        };

        useEffect(() =>{
            localStorage.setItem("id", UserData.id)
            localStorage.setItem("username",UserData.username)
            localStorage.setItem("avatar",UserData.avatar)
            localStorage.setItem("first_name",UserData.first_name)
            localStorage.setItem("last_name",UserData.last_name)
        },[UserData])

        return (
            <UserContext.Provider value={{UserData, updateUserData}}>
                {children}
            </UserContext.Provider>
        );
};
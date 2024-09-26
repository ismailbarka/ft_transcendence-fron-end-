import { useContext, useEffect } from "react";
import loadMyData from "@/Components/LoadMyData";
import { UserContext } from "./context/UserContext";
import { SocketContextProvider } from "./context/socketContext";

export default function Home() {

  const {updateUserData} = useContext(UserContext);
  console.log("Home");
  return (
    <main>

    </main>
  );
}

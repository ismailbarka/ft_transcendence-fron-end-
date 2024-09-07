
import axios from "axios";

const loadMyData = async (access, refresh, updateUserData) => {
  console.log(`Bearer ${access}`);
  console.log("test");

  try {
    const res = await axios.post("http://localhost:8000/api/auth/token/verify/", {
      token: access,
    });
    console.log(res.data);
  } catch (err) {

    try {
      const res = await axios.post("http://localhost:8000/api/auth/token/refresh/", {
        refresh: refresh,
      });
      console.log("New Access Token: " + res.data.access);
      console.log("New Refresh Token: " + res.data.refresh);


      localStorage.setItem("access", res.data.access);
      access = res.data.access;
    } catch (errone) {
      console.error("Error refreshing token:", errone);
      localStorage.clear();
      return 1;
    }
  }
  try {
    const res = await axios.get("http://localhost:8000/api/users/me/", {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    updateUserData({
      id: res.data.id,
      username: res.data.username,
      avatar: res.data.avatar,
      first_name: res.data.first_name,
      last_name: res.data.last_name,
    });
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
  return 0;
};

export default loadMyData;

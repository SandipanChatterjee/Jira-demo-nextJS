"use client";

import axios from "axios";

export const createGuestAccount = async (id) => {
  try {
    const guestApi = await axios.post(
      `${process.env.REACT_APP_API_URL}authentication/guest`
    );
    const res = await guestApi;
    // localStorage.setItem("token", res.data.authToken);
    return guestApi;
  } catch (e) {
    console.log(e);
  }
};

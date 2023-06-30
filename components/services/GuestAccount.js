"use client";

import axios from "axios";

export const createGuestAccount = async (id) => {
  try {
    const guestApi = await axios.post(
      `${process.env.REACT_APP_API_URL}authentication/guest`
    );
    return guestApi;
  } catch (e) {
    console.log(e);
  }
};

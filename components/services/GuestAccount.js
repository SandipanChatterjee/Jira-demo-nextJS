import axios from "axios";

export const createGuestAccount = async (id) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API_URL}authentication/guest`
    );
  } catch (e) {
    console.log(e);
  }
};

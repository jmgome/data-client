import Axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
export const getAllFiles = async () => {
    return Axios.get(`${apiUrl}`);
  };
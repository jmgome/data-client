import Axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const getAllFiles = async () => {
    return Axios.get(`${apiUrl}/usuariosget`);
  };
  export const UploadAbonado = async (data) => {
    return Axios.post(`${apiUrl}/usuarios`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
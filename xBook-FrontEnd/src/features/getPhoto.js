import axios from 'axios';

export const getPhoto = async (file) => {
    const formFIle = new FormData();
    formFIle.append("file", file);
    formFIle.append("upload_preset", "rzbdqb3o");
    return (await axios.post("https://api.cloudinary.com/v1_1/daujrvog8/image/upload", formFIle));
}
import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "FreeLanza"); // Make sure this preset is UNSIGNED

  try {
    const res = await axios.post(import.meta.env.VITE_UPLOAD_LINK, data);
   
    const { secure_url } = res.data; // Correct field
    return secure_url; // Return the correct uploaded image URL
  } catch (err) {
    console.log(err);
  }
};

export default upload;

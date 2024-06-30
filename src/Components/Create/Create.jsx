import { Fragment, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext,AuthContext } from "../../store/Context";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Create = () => {
  const {Firebase} = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const date = new Date()
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, `/images/${image.name}`);

    try {

      await uploadBytes(storageRef, image);


      const url = await getDownloadURL(storageRef);
      console.log(url);

      await addDoc(collection(db, "products"), {
        name,
        category,
        price,
        image: url,
        userId: user.uid,
        createdAt: date.toDateString(),
      });

  
      navigate('/');
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            name="Price"
          />
          <br />

          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>

          <br />
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;

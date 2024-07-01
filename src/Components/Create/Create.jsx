import { Fragment, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../store/Context";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Create = () => {
  const { Firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const date = new Date();
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};

    // Name validation
    if (name.trim().length < 2) {
      formErrors.name = "Item name must be at least 2 characters long";
    }

    // Category validation
    if (category.trim().length < 3) {
      formErrors.category = "Category must be at least 3 characters long";
    }

    // Price validation
    if (!price || isNaN(price) || Number(price) <= 0) {
      formErrors.price = "Price must be a number greater than 0";
    }

    // Image validation
    if (!image) {
      formErrors.image = "Please select an image";
    } else {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
      if (!allowedTypes.includes(image.type)) {
        formErrors.image = "Please upload an image (JPEG, PNG, GIF) or video (MP4, MOV) file";
      }
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (validateForm()) {
      const storage = getStorage();
      const storageRef = ref(storage, `/images/${image.name}`);
      try {
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        console.log(url);
        await addDoc(collection(db, "products"), {
          name: name.trim(),
          category: category.trim(),
          price: Number(price),
          image: url,
          userId: user.uid,
          createdAt: date.toDateString(),
        });
    
        navigate('/');
      } catch (error) {
        console.error("Error uploading file: ", error);
        setErrors({ submit: "Error creating listing. Please try again." });
      }
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 ">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10 mt-5">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed">Create a New Listing</h2>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">Enter the details of your item to list it for sale.</p>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Item Name</label>
                    <input 
                      type="text" 
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                      placeholder="What are you selling?"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Category</label>
                    <input 
                      type="text" 
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                      placeholder="e.g. Electronics, Furniture"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Price</label>
                    <input 
                      type="number" 
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Item Image</label>
                    <input 
                      type="file" 
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                      onChange={(e) => setImage(e.target.files[0])}
                      accept="image/*,video/*"
                    />
                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                  </div>
                  {image && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="mt-2 rounded-md max-h-48 w-auto"
                      />
                    </div>
                  )}
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  <button 
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                    onClick={handleSubmit}
                  >
                    Create Listing
                  </button>
                </div>
                {errors.submit && <p className="text-red-500 text-sm mt-2 text-center">{errors.submit}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
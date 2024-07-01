import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../store/PostContext";
import { FirebaseContext } from "../../store/Context";
import { collection, query, where, getDocs } from "firebase/firestore";

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);
  const { postDetails } = useContext(PostContext);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    if (postDetails && postDetails.userId) {
      const fetchUserDetails = async () => {
        const q = query(collection(db, "users"), where("uid", "==", postDetails.userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      };
      fetchUserDetails();
    }
  }, [db, postDetails]);

  if (!postDetails) return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  return (
    <div className="bg-gray-100  py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto mt-20">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 relative">
              <img 
                className="h-96 w-full object-cover md:w-96 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105" 
                src={postDetails.image} 
                alt={postDetails.name}
                onClick={() => setIsImageFullscreen(true)}
              />
              <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {postDetails.category}
              </div>
            </div>
            <div className="p-8 md:flex-grow">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{postDetails.name}</h1>
                <p className="text-4xl font-bold text-indigo-600">&#x20B9; {postDetails.price}</p>
              </div>
              <p className="mt-4 text-gray-500">Posted on: {new Date(postDetails.createdAt).toLocaleDateString()}</p>
              
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
                <p className="mt-2 text-gray-600">{postDetails.description || "No description provided."}</p>
              </div>
              
              {userDetails && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Seller Information</h2>
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <img className="h-12 w-12 rounded-full" src={userDetails.avatar || "https://via.placeholder.com/100"} alt={userDetails.name} />
                      <div className="ml-4">
                        <p className="text-lg font-medium text-gray-900">{userDetails.name}</p>
                        <p className="text-gray-600">{userDetails.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex space-x-4">
                <button className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                  Contact Seller
                </button>
                <button className="flex-1 bg-white text-indigo-600 px-6 py-3 rounded-md font-medium border border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isImageFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setIsImageFullscreen(false)}>
          <img 
            className="max-h-full max-w-full object-contain" 
            src={postDetails.image} 
            alt={postDetails.name}
          />
        </div>
      )}
    </div>
  );
}

export default View;
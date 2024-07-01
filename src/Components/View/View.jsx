import { useContext, useEffect, useState } from "react";
import "./View.css";
import { PostContext } from "../../store/PostContext";
import { FirebaseContext } from "../../store/Context";
import { collection, query, where, getDocs } from "firebase/firestore";

function View() {
  const [userDetails, setUserDetails] = useState(null);
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

  if (!postDetails) return <div>Loading...</div>;

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.image} alt={postDetails.name} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.name}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;

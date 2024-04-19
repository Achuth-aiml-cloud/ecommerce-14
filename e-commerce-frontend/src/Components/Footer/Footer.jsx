import React, { useState, useEffect } from "react";
import "../DescriptionBox/DescriptionBox.css";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const DescriptionBox = () => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const db = getFirestore();
        const descriptionsRef = collection(db, "descriptions");
        const snapshot = await getDocs(descriptionsRef);
        snapshot.forEach((doc) => {
          setDescription(doc.data().content);
        });
      } catch (error) {
        console.error("Error fetching description:", error);
      }
    };

    fetchDescription();
  }, []);

  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default DescriptionBox;


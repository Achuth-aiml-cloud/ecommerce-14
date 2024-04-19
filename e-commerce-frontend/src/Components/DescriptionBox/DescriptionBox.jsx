import React, { useState, useEffect } from "react";
import "./DescriptionBox.css";
import { collection, getFirestore, getDocs } from 'firebase/firestore';

const DescriptionBox = () => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const db = getFirestore();
        const descriptionCollectionRef = collection(db, 'descriptions');
        const descriptionSnapshot = await getDocs(descriptionCollectionRef);
        const descriptionData = descriptionSnapshot.docs.map(doc => doc.data());
        // For simplicity, assuming there's only one description document
        if (descriptionData.length > 0) {
          setDescription(descriptionData[0].content);
        }
      } catch (error) {
        console.error('Error fetching description:', error);
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

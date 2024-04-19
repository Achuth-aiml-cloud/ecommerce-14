import React, { useEffect, useState } from 'react';
import './Offers.css';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const Offers = () => {
  const [offerImage, setOfferImage] = useState(null);

  useEffect(() => {
    const fetchOfferImage = async () => {
      try {
        const storage = getStorage();
        const offerImageRef = ref(storage, 'offers/exclusive_image.png');
        const imageUrl = await getDownloadURL(offerImageRef);
        setOfferImage(imageUrl);
      } catch (error) {
        console.error('Error fetching offer image:', error);
      }
    };

    fetchOfferImage();
  }, []);

  return (
    <div className='offers'>
      <div className='offers-left'>
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
        <button>Check now</button>
      </div>
      <div className='offers-right'>
        {offerImage && <img src={offerImage} alt='Exclusive Offer' />}
      </div>
    </div>
  );
};

export default Offers;

import React, { useState } from 'react';
import '../NewsLetter/NewsLetter.css';
import { collection, addDoc } from 'firebase/firestore';
import { app , auth , db , storage  } from '../../firebase'; // Import your Firebase instance

const NewsLetter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async () => {
    try {
      const subscriptionsCollection = collection(db, 'newsletterSubscriptions');
      await addDoc(subscriptionsCollection, { email });
      setEmail(''); // Clear the input field after subscription
      alert('Subscribed successfully!');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      alert('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated.</p>
      <div>
        <input
          type='email'
          placeholder='Your email id'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
    </div>
  );
};

export default NewsLetter;

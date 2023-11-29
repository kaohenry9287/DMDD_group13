// HomePage.js
import React from 'react';
import bannerImage from './homepage.jpg'; // Adjust the path as necessary

const HomePage = () => {
  return (
    <div>
      <img src={bannerImage} alt="Hospital Banner" style={{ width: '100%', height: 'auto' }} />
      {/* Add other home page content here if needed */}
    </div>
  );
};

export default HomePage;

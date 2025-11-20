import React, { useState } from 'react';
import ProfileMemberCard from './components';
import { membersdata } from './FakeData';
import './App.css';

function App() {
    const [currentIndex, setCurrentIndex] = useState(0);

const handleLike = () => {

    setCurrentIndex((prev) => (prev +1)% membersdata.length);
};

const handleDislike = () => {

    setCurrentIndex((prev) => (prev +1)% membersdata.length);
};
    return (
  <div className="app">
    <h1>Dating App</h1>
    <ProfileMemberCard 
      memberdata={membersdata[currentIndex]}
      onLike={handleLike}
      onDislike={handleDislike}
    />
  </div>

);
}

export default App;


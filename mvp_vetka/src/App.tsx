import React, { useState, useEffect } from 'react';
import {ProfileMemberCard} from './components';
import { LoadingScreen } from './components';
import type  { MemberData } from './FakeData';
import { membersdata } from './FakeData';
import './App.css';



function App() {
    const [currentIndex, setCurrentIndex] = useState(0);

const handleLike = () => {

    setCurrentIndex((prev) => ((prev +1)% membersdata.length));
};

const handleDislike = () => {

    setCurrentIndex((prev) => (prev +1)% membersdata.length);
};
    return (
  <div className="app">
    <h1>Dating App</h1>
    <ProfileMemberCard 
      memberdata={membersdata[currentIndex]}
      onLike={handleLike} onDislike={handleDislike}
    />
  </div>

);
}

export default App;

const FakeProfileData: MemberData = {

    id:0,
    image: "",
    name:"None",
    age:0,
    company: "N/A",
    about: "Данные загружаются"
        
    }


export const LoadApp:React.FC = () => {
  const[isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const FakeLoading = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsLoading(false);
    };
    FakeLoading();
  }, []);
  return (
    <div className="LoadingFake">
      {isLoading ? <LoadingScreen/>:
      <ProfileMemberCard
        memberdata ={FakeProfileData}
        onDislike={()=>{}}
        onLike={()=>{}}/>}
    </div>
  );
};




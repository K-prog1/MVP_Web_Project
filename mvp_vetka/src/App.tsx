import React, { useState, useEffect } from 'react';
import { ProfileMemberCard } from './ProfileMemberCardProps';
import { membersdata, type MemberData } from './FakeData';
import './App.css';
import LoadingScreen from './LoadingScreen';


function App() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState<MemberData[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setUsers(membersdata);
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleLike = () => {
        setCurrentIndex((prev) => (prev + 1) % membersdata.length);
    };

    const handleDislike = () => {
        setCurrentIndex((prev) => (prev + 1) % membersdata.length);
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="app">
            <main className="main-content">
                    <ProfileMemberCard 
                        memberdata={users[currentIndex]}
                        onDislike={handleDislike}
                        onLike={handleLike} 
                        
                    />
              </main>
          </div>
    );
}

export default App;




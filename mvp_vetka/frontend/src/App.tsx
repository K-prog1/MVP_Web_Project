import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProfileMemberCard from './ProfileMemberCardProps';
import LoadingScreen from './LoadingScreen';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import type { ApiUser } from './api/types';
import { usersAPI } from './api/users';
import { membersdata } from './FakeData';


function App() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState<ApiUser[]>([]);
    const [error, setError] = useState<string>('');
    const [showMatchModal, setShowMatchModal] = useState(false);
    const [matchedUser, setMatchedUser] = useState<ApiUser | null>(null);

    const loadUsersFromAPI = async () => {
        try {
            setIsLoading(true);
            setError('');
            
            const response = await usersAPI.getFeed();
            const fetchedUsers = response.data.users;
            
            if (fetchedUsers.length === 0) {
                setError('Пока нет пользователей для показа');
           
                setUsers(convertToApiUsers(membersdata));
            } else {
                setUsers(fetchedUsers);
            }
        } catch (err: any) {
            console.error('API Error:', err);

            setUsers(convertToApiUsers(membersdata));
            setError('Бэкенд не доступен. Используются демо-данные.');
        } finally {
            setIsLoading(false);
        }
    };

    const convertToApiUsers = (localUsers: any[]): ApiUser[] => {
        return localUsers.map(user => ({
            id: user.id,
            full_name: user.name,
            company: user.role.includes('Предприниматель') ? 'Свой бизнес' : 'ИТ компания',
            position: user.role,
            interests: user.interests,
            bio: user.about,
            avatar_url: user.image,
            age: user.age,
            created_at: new Date().toISOString()
        }));
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            loadUsersFromAPI();
        } else {

            setUsers(convertToApiUsers(membersdata));
            setIsLoading(false);
        }
    }, []);

    const handleLike = async () => {
        if (users[currentIndex]) {
            try {

                const response = await usersAPI.likeUser(users[currentIndex].id);

                if (response.data.matched) {
                    setMatchedUser(users[currentIndex]);
                    setShowMatchModal(true);
                }
                
                const newUsers = users.filter((_, idx) => idx !== currentIndex);
                setUsers(newUsers);
                
                if (newUsers.length === 0) {
                    await loadUsersFromAPI();
                    setCurrentIndex(0);
                } else {
                    setCurrentIndex(prev => prev >= newUsers.length - 1 ? 0 : prev);
                }
            } catch (error) {
                console.error('Error liking user:', error);

                setCurrentIndex(prev => (prev + 1) % users.length);
            }
        }
    }

    const handleDislike = async () => {
        if (users[currentIndex]) {
            try {
                await usersAPI.dislikeUser(users[currentIndex].id);
                
                const newUsers = users.filter((_, idx) => idx !== currentIndex);
                setUsers(newUsers);
                
                if (newUsers.length === 0) {
                    await loadUsersFromAPI();
                    setCurrentIndex(0);
                } else {
                    setCurrentIndex(prev => prev >= newUsers.length - 1 ? 0 : prev);
                }
            } catch (error) {
                console.error('Error disliking user:', error);
                setCurrentIndex(prev => (prev + 1) % users.length);
            }
        }
    };

    const handleReload = () => {
        loadUsersFromAPI();
        setCurrentIndex(0);

    };
    const renderFeed = () => {
        if (isLoading) {
            return <LoadingScreen />;
        }
        if (error) {
            return (
                <div className='app'>
                    <div className='error-screen'> 
                        <h3>Внимание</h3>
                        <p>{error}</p>
                        <button onClick={handleReload} className = "reload-button">
                            Обновить
                        </button>
                    </div>
                </div>
            );
        }

        const currentUser = users[currentIndex];

        return (
            <div className="app">
                <main className='main-content'>
                    <ProfileMemberCard
                        memberdata={{
                            id: currentUser.id,
                            name: currentUser.full_name,
                            image: currentUser.avatar_url || '/default-avatar.jpg',
                            age: currentUser.age || 25,
                            role: currentUser.position || 'Участник',
                            interests: currentUser.interests || 'Не указано',
                            about: currentUser.bio || ''
                        }}
                        onDislike={handleDislike}
                        onLike={handleLike}>
                    </ProfileMemberCard>
                    <div className='feed-counter'>
                        Осталось: {users.length} пользователей
                    </div>
                </main>
                {showMatchModal && matchedUser && (
                    <div className='match-modal-overlay'>
                        <div className="match-modal">
                            <div className='match-content'>
                                <h2>🎉 Это взаимный лайк!</h2>
                                <p>Вы понравились <strong>{matchedUser.full_name}</strong></p>
                                <p>Теперь вы можете общаться</p>
                                <button 
                                    onClick={() => setShowMatchModal(false)}
                                    className="match-button"
                                >
                                    Отлично!
                                </button>
                            </div>
                        </div>
                        
                    </div>
                )}
                </div>
        );
    };
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path='/login' element={<LoginForm/>}/>

                <Route path='/' element={
                    <ProtectedRoute>
                        {renderFeed()}
                    </ProtectedRoute>
                } />

                <Route path='/feed' element={
                    <ProtectedRoute>
                        {renderFeed()}
                    </ProtectedRoute>
                } />

                <Route path='/likes' element={
                    <ProtectedRoute>
                        <div className="likes-page">
                            <h2>Мои лайки</h2>
                            <p>Cкоро здесь появяться пользователи, которых вы лайкнули</p>
                        </div>
                    </ProtectedRoute>
                } />

                <Route path='*' element={<Navigate to = '/' replace />} />
            </Routes>
        </Router>

    );
}

export default App;
            
        
    

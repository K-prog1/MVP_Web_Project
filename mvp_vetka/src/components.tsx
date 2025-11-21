import React from "react";
import type { MemberData } from "./FakeData";

 interface ProfileMemberCardProps {
    
    memberdata: MemberData;
    onLike: () => void;
    onDislike: () => void;


}

export const ProfileMemberCard: React.FC<ProfileMemberCardProps> = ({
    
    memberdata,
    onLike,
    onDislike

}) => {
    return (
        <div className = "profile-card">
            <img src = {memberdata.image} alt = "Image not loaded"></img>
            <h2>{memberdata.name}, {memberdata.age}</h2>
            <p><strong>Компания:</strong>{memberdata.company}</p>
            <p><strong>Обо мне:</strong>{memberdata.about}</p>
            <div className = 'actions'>

                <button onClick={onDislike} className = "DislikeButton">
                    Дизлайк
                </button>
                <button onClick={onLike} className = "LikeButton">
                    Лайк
                </button>
            </div>
        </div>
    )
}

export default ProfileMemberCard;


export const LoadingScreen: React.FC = () => {

    return (
        <div style = {{
            
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f0f0',
            fontSize: '24px'
        }}>
            Зарузка...
        </div>
    );
};



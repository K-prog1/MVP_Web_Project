import React from "react";
import type { MemberData } from "../src/FakeData";

interface ProfileMemberCardProps {
    
    memberdata: MemberData;
    onLike: () => void;
    onDislike: () => void;


}

const ProfileMemberCard: React.FC<ProfileMemberCardProps> = ({
    
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
                    Дизлайк
                </button>
            </div>
        </div>
    )
}
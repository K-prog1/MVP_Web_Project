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
            <p><strong>Что я люблю:</strong>{memberdata.WhatIlove}</p>
            <p><strong>Обо мне:</strong>{memberdata.about}</p>
            <div className = 'actions'>

                <button onClick={onDislike}>
                    Дизлайк
                </button>
                <button onClick={onLike}>
                    Лайк
                </button>
            </div>
        </div>
    )
}

export default ProfileMemberCard;


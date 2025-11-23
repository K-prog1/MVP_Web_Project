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
                <div className = 'profile-inform'>
                    <div className = 'profile-elenments'>
                        <p><strong>Компания: </strong>{memberdata.role}</p>
                    </div>
                    <div className = 'profile-elenments'>
                        <p><strong>Интересы: </strong>{memberdata.interests}</p>
                    </div>
                    <div className = 'profile-elenments'>
                        <p><strong>Обо мне: </strong>{memberdata.about}</p>
                    </div>
                </div>
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


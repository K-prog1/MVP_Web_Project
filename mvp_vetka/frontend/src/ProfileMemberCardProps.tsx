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
                
                <div className = 'actions'>
                        <button onClick={onLike}>
                            ♡  Сохранить
                        </button>
                        <button onClick={onDislike}>
                           ⟶  Дальше 
                        </button>
                        
                </div>
                
                <div className = 'profile-inform'>
                    <h2 className="DataAndAge">{memberdata.name}, {memberdata.age}</h2>
                    <div className = 'profile-elements'>
                        <p>{memberdata.role}</p>
                    </div>
                    <div className = 'profile-elements'>
                        <p>{memberdata.interests}</p>
                    </div>
                    <div className = 'profile-elements'>
                        <p>{memberdata.about}</p>
                    </div>
                </div>
                
        </div>
    )
}

export default ProfileMemberCard;


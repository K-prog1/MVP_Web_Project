import MuscleITGuy from "./assets/MuscleITGuy.jpg";
import RobbyItGuy from "./assets/RobbyItGuy.png";
import GordenItSceintist from "./assets/GordenItSceintist.jpg"

export interface MemberData  {
    id:number
    image:string; //укажем здесь путь изображения
    name:string;
    age:number;
    company:string;
    about:string;
}

export const membersdata: MemberData[] = [
{
    id:1,
    image: MuscleITGuy,
    name:"Айтишникус",
    age:45,
    company:"Лентяево",
    about:"отобьюсь от любого и защищу любого, за БЕСПАЛТНО!"
},
{   
    id:2,
    image: RobbyItGuy,
    name:"Робби",
    age:55,
    company:"Злодяево",
    about:"За деньги я готов подпортить жизнь людям..."
},
{
    id:3,
    image: GordenItSceintist,
    name:"Горден Фримен",
    age:35,
    company:"Черная меза",
    about:"Я гениальный ученый, герой сопртовления, \
     возьми меня на работу пж"
}]


import MuscleITGuy from "@/assets/MuscleITGuy.jpg";
import RobbyItGuy from "@/assets/RobbyItGuy.png";
import GordenItSceintist from "@/assets/GordenItSceintist.jpg"

<<<<<<< HEAD
export type MemberData = {
=======
export interface MemberData  {
    id:number
>>>>>>> frontend
    image:string; //укажем здесь путь изображения
    name:string;
    age:number;
    company:string;
    about:string;
}

<<<<<<< HEAD
const membersdata: MemberData[] = [
{
=======
export const membersdata: MemberData[] = [
{
    id:1,
>>>>>>> frontend
    image: MuscleITGuy,
    name:"Айтишникус",
    age:45,
    company:"Лентяево",
    about:"отобьюсь от любого и защищу любого, за БЕСПАЛТНО!"
},
<<<<<<< HEAD
{
=======
{   
    id:2,
>>>>>>> frontend
    image: RobbyItGuy,
    name:"Робби",
    age:55,
    company:"Злодяево",
    about:"За деньги я готов подпортить жизнь людям..."
},
{
<<<<<<< HEAD
=======
    id:3,
>>>>>>> frontend
    image: GordenItSceintist,
    name:"Горден Фримен",
    age:35,
    company:"Черная меза",
    about:"Я гениальный ученый, герой сопртовления, \
     возьми меня на работу пж"
}]


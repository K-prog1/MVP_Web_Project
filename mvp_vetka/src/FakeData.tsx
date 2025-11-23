import photo_1 from "./assets/photo_1.jpg";
import photo_2 from "./assets/photo_2.jpg";
import photo_3 from "./assets/photo_3.jpg";
import photo_4 from "./assets/photo_4.jpg";


export interface MemberData  {
    id:number
    interests:string;
    image:string; //укажем здесь путь изображения
    name:string;
    age:number;
    role:string;
    about:string;
}

export const membersdata: MemberData[] = [
{
    id:1,
    interests:"Финансы и прибыль",
    image: photo_1,
    name:"Александр",
    age:23,
    role:"Предприниматель",
    about:"Усердный, читаю много книг."
},
{   
    id:2,
    interests:"Программирование на 1C",
    image: photo_2,
    name:"Саша",
    age:27,
    role:"Программист",
    about:"Программирую на 1C полтора года."
},
{
    id:3,
    interests:"Устраивать взрывы",
    image: photo_3,
    name:"Cергей",
    age:35,
    role:"Электрик",
    about:"Недавно закончил учёбу. Без опыта."
},

{
    id:4,
    interests:"3D-моделирование и прототипирование",
    image: photo_4,
    name:"Антон",
    age:30,
    role:"Инженер",
    about:"Инженер-конструктор с 7-летним опытом в машиностроении."
}]


import React from 'react';
import { Link } from 'react-router-dom';
import  './Category.css'
import car from '../Assets/car.png';
import decoration from '../Assets/decoration.png';
import game from '../Assets/game.png';
import home from '../Assets/home.png';
import baby from '../Assets/baby.png';
import family from '../Assets/family.png';
import video from '../Assets/video.png';
import tshirt from '../Assets/tshirt.png';
import cosmetic from '../Assets/Cosmetics.png';
import sport from '../Assets/sport.png';
import electronic from '../Assets/electronic.png';
import garden from '../Assets/garden.png';
import musical from '../Assets/musical.png';
import pet from '../Assets/pet.png';
// import Car from './Category-item/car'


const Category = () => {
  const items = [
    { name: "ยานพาหนะ", path: '/Car', image: car },
    { name: "ของตกแต่งในบ้าน", path: "/Decoration", image: decoration },
    { name: "ของเล่นและเกมส์", path: "/Game", image: game },
    { name: "อสังหาริมทรัพย์", path: "/Homes", image: home},
    { name: "ผลิตภัณฑ์เด็ก", path: "/Baby", image:  baby},
    { name: "ครอบครัว", path: "/Family", image: family},  
    { name: "ความบันเทิง", path: "/Video", image:  video},  
    { name: "เสื้อผ้า", path: "/Tshirt", image: tshirt },
    { name: "เครื่องสำอางค์", path: "/Cosmetic", image: cosmetic},
    { name: "กีฬา", path: "/Sport", image: sport },
    { name: "อุปกรณ์อิเล็คทรอนิกส์", path: "/Electronic", image: electronic },
    { name: "สวนและกลางแจ้ง", path: "/Garden", image:garden  },
    { name: "เครื่องดนตรี", path: "/Musical", image: musical},  
    { name: "สัตว์เลี้ยง", path: "/Pet", image: pet }
    // เพิ่มหมวดหมู่เพิ่มเติมที่นี่
  ];
  
  return (
    <div className="category">
      <div className="category-list">
        {items.map((item, i) => (
          <Link className="list-name" to={item.path} key={i} style={{ display:'flex', justifyContent:'center' , flexDirection:'column', alignItems: 'center' }}>
            <div className="background-img" style={{ width: '50px', height: '50px', borderRadius: '100%' }} >
            <img src={item.image} alt={item.name} style={{ width: '30px', height: '30px' }} />
            </div>
            <span style={{ marginTop:'10px'}}>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;

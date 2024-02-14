import React from 'react';
import { Link } from 'react-router-dom';

interface ShopItemProps {
    id : number,
    img: string,
    title: string,
    composition: string

}



const ShopItem: React.FC<ShopItemProps> = ({ id,img, title, composition }) => {
    return (
        <Link to={`/full-item/${id}`} className='shop-item'>
            <img className="shop-item__img" src={`./img/liquid/${img}`} alt="item.png" />
            <h1 className="shop-item__title">{title}</h1>
            <div className="shop-item__composition">{composition}</div>
        </Link>
    );
};

export default ShopItem;
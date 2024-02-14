import React from 'react';

interface InfoItemProps {
    img : string,
    desc : string
}



const InfoItem : React.FC<InfoItemProps> = ({img,desc}) => {
    return (
        <div className='item-info-container'>
            <img src={`./img/${img}`} alt="item.png" />
            <p>{desc}</p>
        </div>
    );
};

export default InfoItem;
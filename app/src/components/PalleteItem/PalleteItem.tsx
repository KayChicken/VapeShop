import React from 'react';

interface PalleteItemProps {
    img : string,
    desc : string
}

const PalleteItem : React.FC<PalleteItemProps> = ({img,desc}) => {
    return (
        <div className='pallete-item'>
            <img src={`./img/${img === 'molotov' ? `${img}.webp` : `${img}.png` }`} alt="pallete.png" />
            <h2>{desc}</h2>
        </div>
    );
};

export default PalleteItem;
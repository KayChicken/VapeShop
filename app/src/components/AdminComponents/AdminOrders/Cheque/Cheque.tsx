import React from 'react';
import { Link } from 'react-router-dom';

interface IChequeProps {
    id: number,
    total_cheque: number,
    date: any
}


const Cheque: React.FC<IChequeProps> = ({ id, total_cheque, date }) => {

    const formattedDate = new Date(date)

    return (
        <Link to={`/admin-panel/orders/${id}`} className='order-container' style={{ marginTop: "10px" }}>
            <div style={{display:'flex' , columnGap:"10px"}}>
                <div>Чек №{id}</div>
                <div>Сумма:{total_cheque}</div>
                <div>Дата:{formattedDate.toLocaleDateString('en-GB')} {formattedDate.toLocaleTimeString()}</div>
            </div>
        </Link>
    );
};

export default Cheque;
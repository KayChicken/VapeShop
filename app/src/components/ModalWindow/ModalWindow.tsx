import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IModalProps, deleteModal } from '../../store/slices/moduleWindowSlice';





const Modal  : React.FC<IModalProps> = ({ id, title, desc, bgColor}) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(deleteModal(id));
        }, 10000);

        
    },[]);

    return (
        <div key={id} className="modal" style={{backgroundColor : bgColor}}>
            <h4 className='modal__title'>{title}</h4>
            <p className='modal__paragraph'>{desc}</p>
        </div>
    );
};



const ModalWindow = () => {


    const { modals } = useSelector((state: RootState) => state.moduleWindow)
  



    



    return modals && (
        <div className='modal-windows'>
            {modals.map((modal) => (
                <Modal id={modal.id} title={modal.title} desc={modal.desc} bgColor={modal.bgColor} status={modal.status}/>
            ))}
        </div>
    )


};

export default ModalWindow;
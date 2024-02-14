import {createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'






interface IModalWindow {
    modals : IModalProps[]
}

export interface IModalProps {
    id : string,
    status : number,
    title : string,
    desc : string,
    bgColor : string
}



const initialState: IModalWindow = {
    modals : []
}

export const moduleWindow = createSlice({
    name: 'modal',
    initialState,
    reducers: {

        setStatus: (state,action: PayloadAction<number>) => {
            const status = action.payload
            const modal = {id : Date.now().toString(), title : '', desc : '', status : status, bgColor : ''}
            switch (status) {
                case 201:
                    modal.title = "Заказ Оформлен"
                    modal.desc = "В ближайшее время с вами свяжется администратор!"
                    modal.bgColor = "#32a852"
                    
                    break
                case 401:
                    modal.title = "Не авторизован"
                    modal.desc = "Пожалуйста авторизируйтесь"
                    modal.bgColor = "#f5ec42"
  
                    break
                case 400:
                    modal.title = "Произошла ошибка"
                    modal.desc = "Неизвестная ошибка, попробуйте перезагрузить сайт!"
                    modal.bgColor = "#EF5350"
                      
                    break

            }
            state.modals.push(modal)
        },

        deleteModal: (state, action : PayloadAction<string>) => {
            state.modals = state.modals.filter((modal) => modal.id !== action.payload);
          },
        



    },
   

})


export const {setStatus,deleteModal} = moduleWindow.actions
export default moduleWindow.reducer
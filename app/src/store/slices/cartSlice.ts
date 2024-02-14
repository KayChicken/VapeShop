import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import { PriceInterface } from '../../components/FullItem/FullItem'


export interface CartProps {
    id : number,
    id_prod: number,
    name: string,
    attributes: {
        name: string,
        value: string
    }[],
    dops: {
        title : string,
        values : {
            add_id: number;
            name: string;
            price: number;
        }
    }[],
    img: string,
    quantity : number,
    price : number

}



export interface CartState {
    cart: CartProps[]
}

const initialState: CartState = {
    cart: [],
}





export const counterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addCart: (state, action: PayloadAction<CartProps>) => {
            state.cart.push(action.payload)
      
        },


        changeCartCount : (state,action : PayloadAction<{id : number, count : number}>) => {
            const find = state.cart.find((item) => item.id === action.payload.id)
            if (find) {
                find.quantity = action.payload.count
            }
        },


        removeFromCart : (state,action : PayloadAction<number>) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload)
        },

    },
})

// Action creators are generated for each case reducer function
export const { addCart , changeCartCount , removeFromCart} = counterSlice.actions

export default counterSlice.reducer
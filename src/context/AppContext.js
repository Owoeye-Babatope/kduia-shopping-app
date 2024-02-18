import React, { createContext, useContext, useReducer } from 'react';


const AppContext = createContext();
const initialState = {
    expenses: [
        {id: "Shirt", name: "Shirt", quantity: 0, unitprice: 500},
        {id: "Jeans", name: "Jeans", quantity: 0, unitprice: 300},
        {id: "Dress", name: "Dress", quantity: 0, unitprice: 400},
        {id: "Dinner set", name: "Dinner set", quantity: 0, unitprice: 600},
        {id: "Bags", name: "Bags", quantity: 0, unitprice: 200},
    ],
    Location: "£"
}

const AppProvider = (props) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    const totalExpenses = state.expenses.reduce((total, item) => {
        return (total = total + (item.unitprice*item.quantity));
    }, 0);

    state.CartValue = totalExpenses;

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                CartValue: state.CartValue,
                dispatch,
                Location: state.Location
            }}>
                {props.children}
        </AppContext.Provider>
    )


}
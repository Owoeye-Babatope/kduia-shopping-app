import React, { createContext, useReducer } from 'react';



// 1.  Set the initial state when the app loads. The state object holds expenses list with variables  id, name, quantity, unitprice

// 2. Create the context to import and provide the state.

// 3. Provider component - wrap the component we want to give access to the state
// accept the children, which are the nested (wrapped) componnets

// 4. Set up the app state in the provider, takes a reducer and the initial state


// 5. The reducer - This is used to update the state based on the action.




const initialState = {
    expenses: [
        {id: "Shirt", name: "Shirt", quantity: 0, unitprice: 500},
        {id: "Jeans", name: "Jeans", quantity: 0, unitprice: 300},
        {id: "Dress", name: "Dress", quantity: 0, unitprice: 400},
        {id: "Dinner set", name: "Dinner set", quantity: 0, unitprice: 600},
        {id: "Bags", name: "Bags", quantity: 0, unitprice: 200},
        {id: "Toothbrush", name: "Toothbrush", quantity: 0, unitprice: 20}

    ],
    Location: "£"
}

export const AppContext = createContext();

export const AppProvider = (props) => {


    const [state, dispatch] = useReducer(AppReducer, initialState);

    const totalExpenses = state.expenses.reduce((total, item) => {
        return (total = total + (item.quantity * item.unitprice))
    }, 0)

    state.CartValue = totalExpenses;


    return (
        <AppContext.Provider
        value={
            {
                expenses: state.expenses,
                CartValue: state.CartValue,
                dispatch,
                Location: state.Location
            }
        }
        >

        {props.children}

        </AppContext.Provider>

    )
}




export const AppReducer = (state, action) => {
    let new_expenses = []; 
    switch (action.type) {
        case 'ADD_QUANTITY':
            let updatedqty = false;
            state.expenses.map((expense) => {
                if(expense.name === action.payload.name){
                    expense.quantity = expense.quantity + 
                    action.payload.quantity;
                    updatedqty = true;
                }
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";
            return{
                ...state,
            };
        
        case 'RED_QUANTITY':
            state.expenses.map((expense) => {
                if(expense.name === action.payload.name){
                    expense.quantity = expense.quantity - 
                    action.payload.quantity;
                }
                expense.quantity = expense.quantity < 0 ? 0 : expense.quantity;
                new_expenses.push(expense)
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";
            
            return {
                ...state
            };
    case "DELETE_ITEM" :
        state.expense.map((expense) => {
            if (expense.name === action.payload.name){
                expense.quantity = 0;
            }
            new_expenses.push(expense);
            return true;
        })
        state.expenses = new_expenses;
        action.type = "DONE";
        return {
            ...state,
        };
    case "CHG_LOCATION":
        action.type = "DONE";
        state.Location = action.payload;
        return {
            ...state,
        }

    default: 
        return state;

        }
};

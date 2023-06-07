import { createContext , useReducer , useEffect } from "react";

const INITIAL_STATE = {
    username: null,
    email: null,
    password: null,
    loading: false,
    error: null,
};

export const RegisterContext = createContext(INITIAL_STATE)

const RegisterReducer = (state , action) => {
    switch (action.type) {
        case "REGISTER_START":
            return {
                username: null,
                email: null,
                password: null,
                loading: true,
                error: null,
            };
        case "REGISTER_SUCCESS":
            return {
                username: action.payload,
                email: action.payload,
                password: action.payload,
                loading: false,
                error: null,
            };
        case "REGISTER_FAILURE":
            return {
                username: null,
                email: null,
                password: null,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const RegisterContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(RegisterReducer, INITIAL_STATE)
    

    return(
        <RegisterContext.Provider value={{username:state.username , email:state.email , password:state.password , loading:state.loading , error:state.error , dispatch}}>
            {children}
        </RegisterContext.Provider>
    )
}
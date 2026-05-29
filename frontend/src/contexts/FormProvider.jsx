import { useReducer } from "react";
import FormContext from "./FormContext";

const ACTIONS = {
    CHANGE: "CHANGE",
}

const FormProvider = ({ children }) => {
    const formReducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.CHANGE:
                return { ...state, [action.field]: action.value };
            default:
                throw new Error(`Unknown Action: ${action.type}`);
        }
    }
    const [state, dispatch] = useReducer(formReducer, { name: "", email: "", password: "" });

    return (
        <FormContext.Provider value={{
            ACTIONS,
            ...state,
            dispatch,

        }}>
            {children}
        </FormContext.Provider>
    )
}

export default FormProvider;
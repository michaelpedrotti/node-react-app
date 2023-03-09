import { createContext, useState } from "react";

export const ErrorContext = createContext();
ErrorContext.displayName = "ErrorContext";

export const ErrorContextProvider = ({ children }) => {

    const errorState = useState(null);

    return (
        <ErrorContext.Provider value={ errorState }>
            { children }
        </ErrorContext.Provider>
    );
};
import { createContext, useState } from "react";

export const SessionContext = createContext();
SessionContext.displayName = "SessionContext";

export const SessionContextProvider = ({ children }) => {

    const sessionState = useState(null);

    return (
        <SessionContext.Provider value={ sessionState }>
            { children }
        </SessionContext.Provider>
    );
};
import { useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";


export const AuthState = ({ children }) => {
    const URL = "https://treasurehunt-3.onrender.com";
  


    return (
        <AuthContext.Provider value={{

            URL

        }}>
            {children}
        </AuthContext.Provider>
    );
};

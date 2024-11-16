import React, { createContext, useState, useContext } from 'react';

// Vytvoření kontextu
const UserContext = createContext();

// Poskytovatel kontextu
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        id: "user123", // Defaultní uživatel
        name: "John Doe",
    });

    const switchUser = (newUserId, newUserName) => {
        setCurrentUser({ id: newUserId, name: newUserName });
    };

    return (
        <UserContext.Provider value={{ currentUser, switchUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook pro přístup k uživatelským datům
export const useUser = () => useContext(UserContext);



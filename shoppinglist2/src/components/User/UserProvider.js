import React, { createContext, useState, useContext } from 'react';

// Vytvoření kontextu
const UserContext = createContext();

// Poskytovatel kontextu
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        id: "user123", // Defaultní uživatel
        name: "John Doe",
        role: "owner", // Role uživatele (defaultně vlastník)
    });

    const switchUser = (newUserId, newUserName, newRole) => {
        setCurrentUser({ id: newUserId, name: newUserName, role: newRole });
    };

    return (
        <UserContext.Provider value={{ currentUser, switchUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook pro přístup k uživatelským datům
export const useUser = () => useContext(UserContext);




import React, { createContext, useState, useContext } from 'react';

const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
    // Data s více seznamy a různými vlastníky
    const [shoppingLists, setShoppingLists] = useState([
        {
            id: 1,
            name: "Groceries",
            owner: "user123",
            members: ["user124", "user125"],
            items: [
                { id: 1, name: "Jablka", isResolved: false },
                { id: 2, name: "Mléko", isResolved: true },
            ],
        },
        {
            id: 2,
            name: "Office Supplies",
            owner: "user124",
            members: ["user123", "user125"],
            items: [
                { id: 3, name: "Papír", isResolved: false },
                { id: 4, name: "Tužky", isResolved: false },
            ],
        },
    ]);

    // Aktuálně přihlášený uživatel
    const [currentUser, setCurrentUser] = useState("user123");

    // Přidání položky do seznamu
    const handleAddItem = (listId, itemName) => {
        setShoppingLists((prevLists) =>
            prevLists.map((list) =>
                list.id === listId
                    ? {
                          ...list,
                          items: [
                              ...list.items,
                              { id: Date.now(), name: itemName, isResolved: false },
                          ],
                      }
                    : list
            )
        );
    };

    // Odebrání položky ze seznamu
    const handleRemoveItem = (listId, itemId) => {
        setShoppingLists((prevLists) =>
            prevLists.map((list) =>
                list.id === listId
                    ? {
                          ...list,
                          items: list.items.filter((item) => item.id !== itemId),
                      }
                    : list
            )
        );
    };

    // Přepnutí stavu položky (vyřešená/nevyřešená)
    const handleToggleItem = (listId, itemId) => {
        setShoppingLists((prevLists) =>
            prevLists.map((list) =>
                list.id === listId
                    ? {
                          ...list,
                          items: list.items.map((item) =>
                              item.id === itemId
                                  ? { ...item, isResolved: !item.isResolved }
                                  : item
                          ),
                      }
                    : list
            )
        );
    };

    // Úprava názvu seznamu
    const handleEditName = (listId, newName) => {
        setShoppingLists((prevLists) =>
            prevLists.map((list) =>
                list.id === listId ? { ...list, name: newName } : list
            )
        );
    };

    // Přidání člena do seznamu
    const handleAddMember = (listId, memberId) => {
        setShoppingLists((prevLists) =>
            prevLists.map((list) =>
                list.id === listId
                    ? {
                          ...list,
                          members: list.members.includes(memberId)
                              ? list.members
                              : [...list.members, memberId],
                      }
                    : list
            )
        );
    };

    // Odebrání člena ze seznamu
    const handleRemoveMember = (listId, memberId) => {
        setShoppingLists((prevLists) =>
            prevLists.map((list) =>
                list.id === listId
                    ? { ...list, members: list.members.filter((id) => id !== memberId) }
                    : list
            )
        );
    };

    return (
        <ShoppingListContext.Provider
            value={{
                shoppingLists,
                currentUser,
                handleAddItem,
                handleRemoveItem,
                handleToggleItem,
                handleEditName,
                handleAddMember,
                handleRemoveMember,
            }}
        >
            {children}
        </ShoppingListContext.Provider>
    );
};

// Hook pro přístup k datům a funkcím
export const useShoppingList = () => useContext(ShoppingListContext);






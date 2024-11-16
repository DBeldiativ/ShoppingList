import React, { createContext, useState, useContext } from 'react';

const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
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
    ]);

    const [currentUser, setCurrentUser] = useState("user123");

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

    const handleEditName = (listId, newName) => {
        setShoppingLists((prevLists) =>
            prevLists.map((list) =>
                list.id === listId ? { ...list, name: newName } : list
            )
        );
    };

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

export const useShoppingList = () => useContext(ShoppingListContext);






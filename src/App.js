import React, { useState } from 'react';
import ShoppingListDetail from './components/ShoppingListDetail';

function App() {
    const [listData, setListData] = useState({
        name: "Můj nákupní seznam",
        items: [
            { id: 1, name: "Jablka", isResolved: false },
            { id: 2, name: "Mléko", isResolved: true },
        ],
        members: ["Vlastník", "Člen 1", "Člen 2"],
    });

    const handleEditName = (newName) => {
        setListData((prevData) => ({
            ...prevData,
            name: newName, // Aktualizuj název seznamu
        }));
    };

    const handleAddItem = (itemName) => {
        const newItem = {
            id: Date.now(), // Generuj unikátní ID na základě času
            name: itemName,
            isResolved: false,
        };
        setListData((prevData) => ({
            ...prevData,
            items: [...prevData.items, newItem],
        }));
    };

    const handleDeleteList = () => {
        // Zde můžeš implementovat logiku pro smazání seznamu, pokud je to potřeba
        // Například, pokud bys měl více seznamů
    };

    const handleAddMember = (newMember) => {
        setListData((prevData) => ({
            ...prevData,
            members: [...prevData.members, newMember], // Přidá nového člena do pole členů
        }));
    };

    const handleRemoveItem = (itemId) => {
        setListData((prevData) => ({
            ...prevData,
            items: prevData.items.filter((item) => item.id !== itemId),
        }));
    };

    const handleToggleItem = (itemId) => {
        setListData((prevData) => ({
            ...prevData,
            items: prevData.items.map((item) =>
                item.id === itemId ? { ...item, isResolved: !item.isResolved } : item
            ),
        }));
    };

    const handleRemoveMember = (memberName) => {
        setListData((prevData) => ({
            ...prevData,
            members: prevData.members.filter((member) => member !== memberName),
        }));
    };

    return (
        <div>
            <ShoppingListDetail
                listData={listData}
                handleAddItem={handleAddItem}
                handleRemoveItem={handleRemoveItem}
                handleToggleItem={handleToggleItem}
                handleEditName={handleEditName}
                handleDeleteList={handleDeleteList}
                handleAddMember={handleAddMember}
                handleRemoveMember={handleRemoveMember}
            />
        </div>
    );
}

export default App;


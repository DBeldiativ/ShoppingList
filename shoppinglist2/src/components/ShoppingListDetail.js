import React, { useState } from 'react';
import { useShoppingList } from '../context/ShoppingListContext';
import { useUser } from '../components/User/UserProvider';

function ShoppingListDetail() {
    const {
        shoppingLists,
        handleAddItem,
        handleRemoveItem,
        handleEditName,
        handleToggleItem,
        handleAddMember,
        handleRemoveMember,
    } = useShoppingList();
    const { currentUser, switchUser } = useUser();

    const list = shoppingLists[0];
    const isOwner = list.owner === currentUser.id;

    const [newItemName, setNewItemName] = useState('');
    const [newListName, setNewListName] = useState(list.name);
    const [newMemberId, setNewMemberId] = useState('');
    const [showResolvedOnly, setShowResolvedOnly] = useState(false);

    const handleSwitchToOwner = () => {
        switchUser(list.owner, "Vlastník");
    };

    const handleSwitchToMember = () => {
        if (list.members.length > 0) {
            switchUser(list.members[0], "Člen");
        }
    };

    const filteredItems = showResolvedOnly
        ? list.items.filter((item) => item.isResolved)
        : list.items;

    return (
        <div>
            <h1>{list.name}</h1>
            <p>Přihlášený uživatel: {currentUser.name}</p>
            <button onClick={handleSwitchToOwner}>Přepnout na vlastníka</button>
            <button onClick={handleSwitchToMember}>Přepnout na člena</button>

            {isOwner && (
                <div>
                    <input
                        type="text"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        placeholder="Zadejte nový název seznamu"
                    />
                    <button onClick={() => handleEditName(list.id, newListName)}>
                        Uložit název
                    </button>
                </div>
            )}

            <button onClick={() => setShowResolvedOnly(!showResolvedOnly)}>
                {showResolvedOnly ? "Zobrazit všechny položky" : "Zobrazit pouze vyřešené"}
            </button>

            <ul>
                {filteredItems.map((item) => (
                    <li key={item.id}>
                        <span
                            style={{
                                textDecoration: item.isResolved ? 'line-through' : 'none',
                            }}
                        >
                            {item.name}
                        </span>
                        <button onClick={() => handleToggleItem(list.id, item.id)}>
                            {item.isResolved ? "Označit jako nevyřešené" : "Označit jako vyřešené"}
                        </button>
                        <button onClick={() => handleRemoveItem(list.id, item.id)}>Odebrat</button>
                    </li>
                ))}
            </ul>

            <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Název nové položky"
            />
            <button
                onClick={() => {
                    if (newItemName.trim() !== "") {
                        handleAddItem(list.id, newItemName);
                        setNewItemName('');
                    } else {
                        alert("Název položky nesmí být prázdný!");
                    }
                }}
            >
                Přidat položku
            </button>

            {isOwner && (
                <div>
                    <h3>Správa členů</h3>
                    <ul>
                        {list.members.map((member) => (
                            <li key={member}>
                                {member}
                                <button
                                    onClick={() => handleRemoveMember(list.id, member)}
                                >
                                    Odebrat člena
                                </button>
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        value={newMemberId}
                        onChange={(e) => setNewMemberId(e.target.value)}
                        placeholder="ID nebo jméno nového člena"
                    />
                    <button
                        onClick={() => {
                            if (newMemberId.trim() !== "") {
                                handleAddMember(list.id, newMemberId);
                                setNewMemberId('');
                            } else {
                                alert("ID člena nesmí být prázdné!");
                            }
                        }}
                    >
                        Přidat člena
                    </button>
                </div>
            )}
        </div>
    );
}

export default ShoppingListDetail;










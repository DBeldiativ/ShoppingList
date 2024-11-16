import React, { useState } from 'react';
import { useShoppingList } from '../context/ShoppingListContext';
import { useUser } from '../components/User/UserProvider';
import ItemList from './ItemList';
import MemberManagement from './MemberManagement';

const ShoppingListDetailContainer = () => {
    const {
        shoppingLists,
        handleAddItem,
        handleRemoveItem,
        handleToggleItem,
        handleAddMember,
        handleRemoveMember,
        handleEditName,
    } = useShoppingList();

    const { currentUser, switchUser } = useUser();
    const [currentListId, setCurrentListId] = useState(1); // Výchozí ID seznamu
    const [newListName, setNewListName] = useState(''); // Pro zadání nového názvu seznamu
    const [showResolvedOnly, setShowResolvedOnly] = useState(false); // Filtrování vyřešených položek
    const currentList = shoppingLists.find((list) => list.id === currentListId);

    if (!currentList) {
        return <p>Seznam nenalezen.</p>;
    }

    const isOwner = currentList.owner === currentUser.id;

    return (
        <div>
            <h1>{currentList.name}</h1> {/* Zobrazení aktuálního názvu seznamu */}
            <p>Přihlášený uživatel: {currentUser.name}</p>

            {/* Přepínání rolí */}
            <button onClick={() => switchUser(currentList.owner, "Vlastník")}>
                Přepnout na vlastníka
            </button>
            <button
                onClick={() =>
                    currentList.members.length > 0 &&
                    switchUser(currentList.members[0], "Člen")
                }
            >
                Přepnout na člena
            </button>

            {/* Úprava názvu seznamu */}
            {isOwner && (
                <div>
                    <input
                        type="text"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        placeholder="Nový název seznamu"
                    />
                    <button
                        onClick={() => {
                            handleEditName(currentList.id, newListName);
                            setNewListName(''); // Vymazání inputu po změně
                        }}
                    >
                        Uložit název
                    </button>
                </div>
            )}

            {/* Správa členů */}
            {isOwner && (
                <MemberManagement
                    members={currentList.members || []}
                    onAddMember={(memberId) => handleAddMember(currentList.id, memberId)}
                    onRemoveMember={(memberId) => handleRemoveMember(currentList.id, memberId)}
                />
            )}

            {/* Zobrazení položek */}
            <ItemList
                items={currentList.items}
                showResolvedOnly={showResolvedOnly}
                onToggleItem={(itemId) => handleToggleItem(currentList.id, itemId)}
                onRemoveItem={(itemId) => handleRemoveItem(currentList.id, itemId)}
            />

            {/* Přepínání zobrazení položek */}
            <button onClick={() => setShowResolvedOnly(!showResolvedOnly)}>
                {showResolvedOnly ? "Zobrazit všechny položky" : "Zobrazit pouze vyřešené"}
            </button>

            {/* Přidání nové položky */}
            <div>
                <input
                    type="text"
                    placeholder="Název nové položky"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && e.target.value.trim() !== "") {
                            handleAddItem(currentList.id, e.target.value.trim());
                            e.target.value = "";
                        }
                    }}
                />
                <button
                    onClick={() => {
                        const input = document.querySelector("input[placeholder='Název nové položky']");
                        if (input && input.value.trim() !== "") {
                            handleAddItem(currentList.id, input.value.trim());
                            input.value = "";
                        }
                    }}
                >
                    Přidat položku
                </button>
            </div>
        </div>
    );
};

export default ShoppingListDetailContainer;




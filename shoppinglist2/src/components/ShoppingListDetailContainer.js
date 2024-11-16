import React, { useState } from 'react';
import { useShoppingList } from '../context/ShoppingListContext';
import { useUser } from '../components/User/UserProvider';
import Header from './Header';
import RoleSwitcher from './RoleSwitcher';
import ListTitleEditor from './ListTitleEditor';
import FilterButton from './FilterButton';
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
    const [showResolvedOnly, setShowResolvedOnly] = useState(false); // Filtrování vyřešených položek
    const currentList = shoppingLists.find((list) => list.id === currentListId);

    if (!currentList) {
        return <p>Seznam nenalezen.</p>;
    }

    const isOwner = currentList.owner === currentUser.id;

    return (
        <div>
            <Header title={currentList.name} userName={currentUser.name} />
            <RoleSwitcher
                isOwner={isOwner}
                ownerId={currentList.owner}
                members={currentList.members || []}
                switchUser={switchUser}
            />
            {isOwner && (
                <ListTitleEditor
                    currentTitle={currentList.name}
                    onSave={(newTitle) => handleEditName(currentList.id, newTitle)}
                />
            )}
            {isOwner && (
                <MemberManagement
                    members={currentList.members || []}
                    onAddMember={(memberId) => handleAddMember(currentList.id, memberId)}
                    onRemoveMember={(memberId) => handleRemoveMember(currentList.id, memberId)}
                />
            )}
            <ItemList
                items={currentList.items}
                showResolvedOnly={showResolvedOnly}
                onToggleItem={(itemId) => handleToggleItem(currentList.id, itemId)}
                onRemoveItem={(itemId) => handleRemoveItem(currentList.id, itemId)}
            />
            <FilterButton
                showResolvedOnly={showResolvedOnly}
                toggleFilter={() => setShowResolvedOnly(!showResolvedOnly)}
            />
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

import React, { useState } from 'react';
import { useShoppingList } from '../context/ShoppingListContext';
import { useUser } from '../components/User/UserProvider';
import Header from './Header';
import RoleSwitcher from './RoleSwitcher';
import ListTitleEditor from './ListTitleEditor';
import FilterButton from './FilterButton';
import ItemList from './ItemList';
import MemberManagement from './MemberManagement';
import ShoppingListSelector from './ShoppingListSelector';

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
    const [newItemName, setNewItemName] = useState(""); // Pro přidávání nových položek

    const currentList = shoppingLists.find((list) => list.id === currentListId);

    if (!currentList) {
        return <p>Seznam nenalezen.</p>;
    }

    const isOwner = currentList.owner === currentUser.id;

    const renderHeader = () => (
        <Header title={currentList.name} userName={currentUser.name} />
    );

    const renderRoleSwitcher = () => (
        <RoleSwitcher
            isOwner={isOwner}
            ownerId={currentList.owner}
            members={currentList.members || []}
            switchUser={(userId, role) => switchUser(userId, currentUser.name, role)}
        />
    );

    const renderMemberManagement = () =>
        isOwner && (
            <MemberManagement
                members={currentList.members || []}
                onAddMember={(memberId) => handleAddMember(currentList.id, memberId)}
                onRemoveMember={(memberId) => handleRemoveMember(currentList.id, memberId)}
            />
        );

    const renderItemList = () => (
        <ItemList
            items={currentList.items}
            showResolvedOnly={showResolvedOnly}
            onToggleItem={(itemId) => handleToggleItem(currentList.id, itemId)}
            onRemoveItem={(itemId) => handleRemoveItem(currentList.id, itemId)}
        />
    );

    const renderFilterButton = () => (
        <FilterButton
            showResolvedOnly={showResolvedOnly}
            toggleFilter={() => setShowResolvedOnly(!showResolvedOnly)}
        />
    );

    return (
        <div>
            {/* Přepínač mezi seznamy */}
            <ShoppingListSelector
                shoppingLists={shoppingLists}
                currentListId={currentListId}
                setCurrentListId={setCurrentListId}
            />

            {/* Hlavička seznamu */}
            {renderHeader()}

            {/* Přepínač rolí */}
            {renderRoleSwitcher()}

            {/* Editor názvu seznamu */}
            {isOwner && (
                <ListTitleEditor
                    currentTitle={currentList.name}
                    onSave={(newTitle) => handleEditName(currentList.id, newTitle)}
                />
            )}

            {/* Správa členů */}
            {renderMemberManagement()}

            {/* Seznam položek */}
            {renderItemList()}

            {/* Filtrovací tlačítko */}
            {renderFilterButton()}

            {/* Přidání nové položky */}
            <div>
                <input
                    type="text"
                    placeholder="Název nové položky"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && newItemName.trim() !== "") {
                            handleAddItem(currentList.id, newItemName.trim());
                            setNewItemName("");
                        }
                    }}
                />
                <button
                    onClick={() => {
                        if (newItemName.trim() !== "") {
                            handleAddItem(currentList.id, newItemName.trim());
                            setNewItemName("");
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


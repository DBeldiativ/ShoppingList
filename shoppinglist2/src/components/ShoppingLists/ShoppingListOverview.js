import React, { useState } from 'react';
import ShoppingListItem from './ShoppingListItem';
import CreateShoppingListModal from './CreateShoppingListModal';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import './ShoppingListOverview.css';  // Importování CSS souboru

const initialShoppingLists = [
  { id: 1, name: 'Shopping List 1' },
  { id: 2, name: 'Shopping List 2' },
];

const ShoppingListOverview = () => {
  const [shoppingLists, setShoppingLists] = useState(initialShoppingLists);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  const handleCreateList = () => {
    setShoppingLists([
      ...shoppingLists,
      { id: Date.now(), name: newListName }
    ]);
    setIsModalOpen(false);
    setNewListName('');
  };

  const handleDeleteList = () => {
    setShoppingLists(shoppingLists.filter(list => list.id !== listToDelete.id));
    setIsDeleteConfirmOpen(false);
  };

  return (
    <div>
      <h1>All Shopping Lists</h1>
      <button onClick={() => setIsModalOpen(true)}>Create New List</button>

      <div>
        {shoppingLists.map(list => (
          <ShoppingListItem
            key={list.id}
            list={list}
            onDelete={() => {
              setListToDelete(list);
              setIsDeleteConfirmOpen(true);
            }}
          />
        ))}
      </div>

      {isModalOpen && (
        <CreateShoppingListModal
          newListName={newListName}
          setNewListName={setNewListName}
          handleCreateList={handleCreateList}
          closeModal={() => setIsModalOpen(false)}
        />
      )}

      {isDeleteConfirmOpen && (
        <ConfirmDeleteDialog
          onConfirm={handleDeleteList}
          onCancel={() => setIsDeleteConfirmOpen(false)}
        />
      )}
    </div>
  );
};

export default ShoppingListOverview;


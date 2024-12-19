import React, { useEffect, useState } from "react";
import ShoppingListItem from "./ShoppingListItem";
import CreateShoppingListModal from "./CreateShoppingListModal";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { fetchShoppingLists } from "../../context/api";
import "./ShoppingListOverview.css"; // Importování CSS

const ShoppingListOverview = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  // Načítání seznamů z API
  useEffect(() => {
    const loadShoppingLists = async () => {
      try {
        const data = await fetchShoppingLists();
        setShoppingLists(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading shopping lists:", error);
      }
    };

    loadShoppingLists();
  }, []);

  const handleCreateList = () => {
    setShoppingLists([
      ...shoppingLists,
      { id: Date.now(), name: newListName, items: [] },
    ]);
    setIsModalOpen(false);
    setNewListName('');
  };

  const handleDeleteList = () => {
    setShoppingLists(shoppingLists.filter((list) => list.id !== listToDelete.id));
    setIsDeleteConfirmOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All Shopping Lists</h1>
      <button onClick={() => setIsModalOpen(true)}>Create New List</button>

      <div>
        {shoppingLists.map((list) => (
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



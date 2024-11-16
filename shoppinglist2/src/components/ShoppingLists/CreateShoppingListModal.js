const CreateShoppingListModal = ({ newListName, setNewListName, handleCreateList, closeModal }) => (
    <div className="modal">
      <h2>Create New Shopping List</h2>
      <input
        type="text"
        value={newListName}
        onChange={e => setNewListName(e.target.value)}
        placeholder="List name"
      />
      <button onClick={handleCreateList}>Create</button>
      <button onClick={closeModal}>Close</button>
    </div>
  );
  
  export default CreateShoppingListModal;
  
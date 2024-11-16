const ShoppingListItem = ({ list, onDelete }) => (
    <div className="tile">
      <h3>{list.name}</h3>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
  
  export default ShoppingListItem;
  
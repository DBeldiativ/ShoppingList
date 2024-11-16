const ConfirmDeleteDialog = ({ onConfirm, onCancel }) => (
    <div className="confirm-dialog">
      <p>Are you sure you want to delete this shopping list?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
  
  export default ConfirmDeleteDialog;
  
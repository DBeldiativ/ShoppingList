import React from 'react';

const ItemActions = ({ item, onToggle, onRemove }) => (
    <div>
        <span
            style={{
                textDecoration: item.isResolved ? 'line-through' : 'none',
                cursor: 'pointer',
            }}
            onClick={() => onToggle(item.id)}
        >
            {item.name}
        </span>
        <button onClick={() => onToggle(item.id)}>
            {item.isResolved ? "Označit jako nevyřešené" : "Označit jako vyřešené"}
        </button>
        <button onClick={() => onRemove(item.id)}>Odebrat</button>
    </div>
);

export default ItemActions;

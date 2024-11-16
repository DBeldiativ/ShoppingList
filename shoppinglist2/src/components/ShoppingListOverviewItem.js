import React from 'react';

const ShoppingListOverviewItem = ({ item, onToggleItem, onRemoveItem }) => {
    return (
        <li>
            <span
                style={{
                    textDecoration: item.isResolved ? 'line-through' : 'none',
                }}
            >
                {item.name}
            </span>
            <button onClick={() => onToggleItem(item.id)}>
                {item.isResolved ? "Označit jako nevyřešené" : "Označit jako vyřešené"}
            </button>
            <button onClick={() => onRemoveItem(item.id)}>Odebrat</button>
        </li>
    );
};

export default ShoppingListOverviewItem;

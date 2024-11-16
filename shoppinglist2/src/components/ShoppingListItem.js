import React from 'react';

function ShoppingListItem({ item, isOwner, handleToggleItem, handleRemoveItem }) {
    return (
        <li>
            <span
                style={{ textDecoration: item.isResolved ? 'line-through' : 'none' }}
                onClick={() => handleToggleItem(item.id)}
            >
                {item.name}
            </span>
            {isOwner && (
                <button onClick={() => handleRemoveItem(item.id)}>
                    Smazat
                </button>
            )}
        </li>
    );
}

export default ShoppingListItem;

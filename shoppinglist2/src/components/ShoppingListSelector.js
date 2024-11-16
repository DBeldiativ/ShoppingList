import React from 'react';

const ShoppingListSelector = ({ shoppingLists, currentListId, setCurrentListId }) => (
    <div>
        {shoppingLists.map((list) => (
            <button
                key={list.id}
                onClick={() => setCurrentListId(list.id)}
                disabled={list.id === currentListId}
            >
                {list.name}
            </button>
        ))}
    </div>
);

export default ShoppingListSelector;

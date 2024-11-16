import React from 'react';
import ShoppingListOverviewItem from './ShoppingListOverviewItem';

const ItemList = ({ items, showResolvedOnly, onToggleItem, onRemoveItem }) => {
    const filteredItems = showResolvedOnly
        ? items.filter((item) => item.isResolved)
        : items;

    return (
        <ul>
            {filteredItems.map((item) => (
                <ShoppingListOverviewItem
                    key={item.id}
                    item={item}
                    onToggleItem={onToggleItem}
                    onRemoveItem={onRemoveItem}
                />
            ))}
        </ul>
    );
};

export default ItemList;

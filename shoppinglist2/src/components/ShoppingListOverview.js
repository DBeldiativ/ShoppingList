import React from 'react';
import { useShoppingList } from '../../context/ShoppingListContext';

function ShoppingListOverview() {
    const { shoppingLists, currentUser } = useShoppingList();

    const accessibleLists = shoppingLists.filter(
        (list) => list.owner === currentUser || list.members.includes(currentUser)
    );

    return (
        <div>
            <h2>Seznamy</h2>
            <ul>
                {accessibleLists.map((list) => (
                    <li key={list.id}>
                        {list.name} (Vlastník: {list.owner === currentUser ? "Vy" : list.owner})
                    </li>
                ))}
            </ul>
            <button>Zobrazit archivované seznamy</button>
        </div>
    );
}

export default ShoppingListOverview;

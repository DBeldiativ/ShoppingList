// src/components/UnresolvedItemsFilter.js
import React from 'react';

function UnresolvedItemsFilter({ isFiltered, handleToggle }) {
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={isFiltered}
                    onChange={handleToggle}
                />
                Zobrazit pouze nevyřešené položky
            </label>
        </div>
    );
}

export default UnresolvedItemsFilter;
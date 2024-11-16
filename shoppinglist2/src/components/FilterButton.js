import React from 'react';

const FilterButton = ({ showResolvedOnly, toggleFilter }) => (
    <button onClick={toggleFilter}>
        {showResolvedOnly ? "Zobrazit všechny položky" : "Zobrazit pouze vyřešené"}
    </button>
);

export default FilterButton;

// src/components/ItemAddForm.js
import React, { useState } from 'react';

function ItemAddForm({ handleAdd }) {
    const [inputValue, setInputValue] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        handleAdd(inputValue);
        setInputValue("");
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Přidej položku"
            />
            <button type="submit">Přidat</button>
        </form>
    );
}

export default ItemAddForm;


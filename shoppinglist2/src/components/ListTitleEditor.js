import React, { useState } from 'react';

const ListTitleEditor = ({ currentTitle, onSave }) => {
    const [newTitle, setNewTitle] = useState(currentTitle);

    return (
        <div>
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Nový název seznamu"
            />
            <button onClick={() => onSave(newTitle)}>Uložit název</button>
        </div>
    );
};

export default ListTitleEditor;

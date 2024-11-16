import React, { useState } from 'react';

const MemberManagement = ({ members = [], onAddMember, onRemoveMember }) => {
    const [newMemberId, setNewMemberId] = useState('');

    return (
        <div>
            <h3>Správa členů</h3>
            <ul>
                {members.map((member) => (
                    <li key={member}>
                        {member}
                        <button onClick={() => onRemoveMember(member)}>Odebrat</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newMemberId}
                onChange={(e) => setNewMemberId(e.target.value)}
                placeholder="ID nebo jméno nového člena"
            />
            <button
                onClick={() => {
                    if (newMemberId.trim() !== "") {
                        onAddMember(newMemberId);
                        setNewMemberId('');
                    }
                }}
            >
                Přidat člena
            </button>
        </div>
    );
};

export default MemberManagement;


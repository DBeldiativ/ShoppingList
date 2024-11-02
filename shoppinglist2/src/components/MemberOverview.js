// src/components/MemberOverview.js
import React from 'react';

function MemberOverview({ members, handleRemoveMember }) {
    return (
        <div>
            {members.map((member, index) => (
                <div key={index}>
                    {member.name}
                    <button onClick={() => handleRemoveMember(member.id)}>Odebrat</button>
                </div>
            ))}
        </div>
    );
}

export default MemberOverview;

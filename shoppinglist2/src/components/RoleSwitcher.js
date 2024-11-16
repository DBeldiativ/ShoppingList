import React from 'react';

const RoleSwitcher = ({ isOwner, ownerId, members = [], switchUser }) => (
    <div>
        <button onClick={() => switchUser(ownerId, "Vlastník", "owner")}>
            Přepnout na vlastníka
        </button>
        {members.length > 0 && (
            <button
                onClick={() =>
                    switchUser(members[0], "Člen", "member")
                }
            >
                Přepnout na člena
            </button>
        )}
    </div>
);

export default RoleSwitcher;


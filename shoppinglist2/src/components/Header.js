import React from 'react';

const Header = ({ title, userName }) => (
    <header>
        <h1>{title}</h1>
        <p>Přihlášený uživatel: {userName}</p>
    </header>
);

export default Header;

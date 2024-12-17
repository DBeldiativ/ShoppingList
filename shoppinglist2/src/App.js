import React, { useState } from 'react';
import { UserProvider } from './components/User/UserProvider';
import { ShoppingListProvider } from './context/ShoppingListContext';
import ShoppingListOverview from './components/ShoppingLists/ShoppingListOverview';
import ShoppingListDetailContainer from './components/ShoppingListDetailContainer';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <UserProvider>
        <ShoppingListProvider>
          <header>
            <h1>Shopping List</h1>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </header>
          <ShoppingListOverview />
          <ShoppingListDetailContainer />
        </ShoppingListProvider>
      </UserProvider>
    </div>
  );
}

export default App;










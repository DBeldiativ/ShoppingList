import React, { useState } from 'react';
import { UserProvider } from './components/User/UserProvider';
import { ShoppingListProvider } from './context/ShoppingListContext';
import ShoppingListOverview from './components/ShoppingLists/ShoppingListOverview';
import ShoppingListDetailContainer from './components/ShoppingListDetailContainer';
import './App.css';

// Překlady pro jazyky
const translations = {
  en: {
    title: 'Shopping List',
    darkModeOn: 'Switch to Dark Mode',
    darkModeOff: 'Switch to Light Mode',
    switchLanguage: 'Switch to Czech',
  },
  cs: {
    title: 'Nákupní seznam',
    darkModeOn: 'Přepnout na tmavý režim',
    darkModeOff: 'Přepnout na světlý režim',
    switchLanguage: 'Přepnout na angličtinu',
  },
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en'); // Výchozí jazyk

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'cs' : 'en'));
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <UserProvider>
        <ShoppingListProvider>
          <header className="App-header">
            <h1>{translations[language].title}</h1>
            <button onClick={toggleDarkMode}>
              {isDarkMode
                ? translations[language].darkModeOff
                : translations[language].darkModeOn}
            </button>
            <button onClick={toggleLanguage}>
              {translations[language].switchLanguage}
            </button>
          </header>

          {/* Komponenty pro seznamy */}
          <ShoppingListOverview />
          <ShoppingListDetailContainer />
        </ShoppingListProvider>
      </UserProvider>
    </div>
  );
}

export default App;











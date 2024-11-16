import React from 'react';
import { UserProvider } from './components/User/UserProvider';
import { ShoppingListProvider } from './context/ShoppingListContext';
import ShoppingListOverview from './components/ShoppingLists/ShoppingListOverview';
import ShoppingListDetailContainer from './components/ShoppingListDetailContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ShoppingListProvider>
          {/* Render ShoppingListOverview for list overview */}
          <ShoppingListOverview />

          {/* Optionally render ShoppingListDetailContainer for detail view */}
          <ShoppingListDetailContainer />
        </ShoppingListProvider>
      </UserProvider>
    </div>
  );
}

export default App;










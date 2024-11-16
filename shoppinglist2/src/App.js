import React from 'react';
import { UserProvider } from './components/User/UserProvider';
import { ShoppingListProvider } from './context/ShoppingListContext';
import ShoppingListDetail from './components/ShoppingListDetail';
import './App.css';

function App() {
    return (
        <div className="App">
            <UserProvider>
                <ShoppingListProvider>
                    <ShoppingListDetail />
                </ShoppingListProvider>
            </UserProvider>
        </div>
    );
}

export default App;






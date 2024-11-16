import React from 'react';
import { UserProvider } from './components/User/UserProvider';
import { ShoppingListProvider } from './context/ShoppingListContext';
import ShoppingListDetailContainer from './components/ShoppingListDetailContainer';
import './App.css';

function App() {
    return (
        <div className="App">
            <UserProvider>
                <ShoppingListProvider>
                    <ShoppingListDetailContainer />
                </ShoppingListProvider>
            </UserProvider>
        </div>
    );
}

export default App;









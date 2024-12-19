import axios from "axios";

// Přepínání mezi mock serverem a reálným API
const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";
const API_URL = USE_MOCK ? "http://localhost:5000" : "https://your-real-server.com";

// Načtení všech seznamů
export const fetchShoppingLists = async () => {
  const response = await axios.get(`${API_URL}/shoppingLists`);
  return response.data;
};

// Načtení detailu jednoho seznamu
export const fetchShoppingListById = async (id) => {
  const response = await axios.get(`${API_URL}/shoppingLists/${id}`);
  return response.data;
};

// Export API_URL pro případné další použití
export { API_URL };


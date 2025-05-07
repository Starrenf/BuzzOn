import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

export function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error("Fout bij ophalen van users:", err));

    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("Fout bij ophalen van categories:", err));
  }, []);

  return (
    <AppContext.Provider value={{ users, categories }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext) ?? { users: [], categories: [] };
}

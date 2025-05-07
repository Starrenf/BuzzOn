import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/events.json');
      const data = await res.json();
      setUsers(data.users);
      setCategories(data.categories);
    };
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ users, categories }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
    const [sensorData, setSensorData] = useState([]);
    const [priceHistory, setPriceHistory] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [currentPrice, setCurrentPrice] = useState(28.45);
    const [priceChange, setPriceChange] = useState(0);
    const [balance, setBalance] = useState(0);

    const value = {
        sensorData,
        setSensorData,
        priceHistory,
        setPriceHistory,
        transactions,
        setTransactions,
        currentPrice,
        setCurrentPrice,
        priceChange,
        setPriceChange,
        balance,
        setBalance
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
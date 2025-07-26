import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EmissionData {
  id: string;
  date: string;
  category: string;
  item: string;
  emission: number;
  cost?: number;
}

interface DataContextType {
  emissions: EmissionData[];
  addEmission: (data: Omit<EmissionData, 'id'>) => void;
  getTotalEmissions: () => number;
  getEmissionsByCategory: () => { [key: string]: number };
  getRecentEmissions: () => EmissionData[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [emissions, setEmissions] = useState<EmissionData[]>([
    {
      id: '1',
      date: '2025-01-14',
      category: 'Travel',
      item: 'Car Journey - 15km',
      emission: 3.2,
      cost: 5.50
    },
    {
      id: '2',
      date: '2025-01-14',
      category: 'Electricity',
      item: 'Home Usage - 12kWh',
      emission: 5.4,
      cost: 15.20
    },
    {
      id: '3',
      date: '2025-01-13',
      category: 'Food',
      item: 'Beef Meal',
      emission: 8.1,
      cost: 12.00
    },
    {
      id: '4',
      date: '2025-01-13',
      category: 'Shopping',
      item: 'Online Purchase',
      emission: 2.3,
      cost: 45.00
    }
  ]);

  const addEmission = (data: Omit<EmissionData, 'id'>) => {
    const newEmission = {
      ...data,
      id: Date.now().toString()
    };
    setEmissions(prev => [newEmission, ...prev]);
  };

  const getTotalEmissions = () => {
    return emissions.reduce((total, emission) => total + emission.emission, 0);
  };

  const getEmissionsByCategory = () => {
    return emissions.reduce((acc, emission) => {
      acc[emission.category] = (acc[emission.category] || 0) + emission.emission;
      return acc;
    }, {} as { [key: string]: number });
  };

  const getRecentEmissions = () => {
    return emissions.slice(0, 10);
  };

  return (
    <DataContext.Provider value={{
      emissions,
      addEmission,
      getTotalEmissions,
      getEmissionsByCategory,
      getRecentEmissions
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
// Carbon emission factors for different countries and activities
export interface CarbonFactor {
  country: string;
  electricity: number; // kg CO2 per kWh
  transport: {
    car: number; // kg CO2 per km
    bus: number;
    train: number;
    plane: number; // kg CO2 per km per passenger
  };
  food: {
    beef: number; // kg CO2 per kg
    chicken: number;
    pork: number;
    fish: number;
    vegetables: number;
    dairy: number;
  };
}

export const carbonFactors: Record<string, CarbonFactor> = {
  US: {
    country: 'United States',
    electricity: 0.45,
    transport: {
      car: 0.21,
      bus: 0.089,
      train: 0.041,
      plane: 0.255
    },
    food: {
      beef: 27.0,
      chicken: 6.9,
      pork: 12.1,
      fish: 6.1,
      vegetables: 2.0,
      dairy: 3.2
    }
  },
  GB: {
    country: 'United Kingdom',
    electricity: 0.28,
    transport: {
      car: 0.18,
      bus: 0.082,
      train: 0.035,
      plane: 0.255
    },
    food: {
      beef: 25.8,
      chicken: 6.5,
      pork: 11.8,
      fish: 5.9,
      vegetables: 1.8,
      dairy: 3.0
    }
  },
  DE: {
    country: 'Germany',
    electricity: 0.33,
    transport: {
      car: 0.19,
      bus: 0.075,
      train: 0.032,
      plane: 0.255
    },
    food: {
      beef: 26.2,
      chicken: 6.7,
      pork: 11.9,
      fish: 6.0,
      vegetables: 1.9,
      dairy: 3.1
    }
  },
  FR: {
    country: 'France',
    electricity: 0.052, // Very low due to nuclear power
    transport: {
      car: 0.17,
      bus: 0.073,
      train: 0.029,
      plane: 0.255
    },
    food: {
      beef: 24.9,
      chicken: 6.3,
      pork: 11.5,
      fish: 5.8,
      vegetables: 1.7,
      dairy: 2.9
    }
  },
  JP: {
    country: 'Japan',
    electricity: 0.52,
    transport: {
      car: 0.16,
      bus: 0.071,
      train: 0.027,
      plane: 0.255
    },
    food: {
      beef: 28.5,
      chicken: 7.2,
      pork: 12.8,
      fish: 5.2,
      vegetables: 2.1,
      dairy: 3.4
    }
  },
  CN: {
    country: 'China',
    electricity: 0.68,
    transport: {
      car: 0.22,
      bus: 0.095,
      train: 0.045,
      plane: 0.255
    },
    food: {
      beef: 29.1,
      chicken: 7.5,
      pork: 13.2,
      fish: 6.8,
      vegetables: 2.3,
      dairy: 3.6
    }
  },
  IN: {
    country: 'India',
    electricity: 0.82,
    transport: {
      car: 0.24,
      bus: 0.11,
      train: 0.052,
      plane: 0.255
    },
    food: {
      beef: 30.2,
      chicken: 7.8,
      pork: 13.5,
      fish: 7.1,
      vegetables: 2.5,
      dairy: 3.8
    }
  },
  AU: {
    country: 'Australia',
    electricity: 0.79,
    transport: {
      car: 0.23,
      bus: 0.098,
      train: 0.047,
      plane: 0.255
    },
    food: {
      beef: 31.5,
      chicken: 8.1,
      pork: 14.2,
      fish: 6.5,
      vegetables: 2.2,
      dairy: 3.5
    }
  },
  CA: {
    country: 'Canada',
    electricity: 0.12, // Low due to hydroelectric power
    transport: {
      car: 0.20,
      bus: 0.085,
      train: 0.038,
      plane: 0.255
    },
    food: {
      beef: 26.8,
      chicken: 6.8,
      pork: 12.3,
      fish: 5.7,
      vegetables: 1.9,
      dairy: 3.1
    }
  },
  BR: {
    country: 'Brazil',
    electricity: 0.074, // Low due to hydroelectric power
    transport: {
      car: 0.21,
      bus: 0.092,
      train: 0.043,
      plane: 0.255
    },
    food: {
      beef: 32.1,
      chicken: 7.9,
      pork: 13.8,
      fish: 6.9,
      vegetables: 2.4,
      dairy: 3.7
    }
  }
};

export const getCountryFactor = (countryCode: string): CarbonFactor => {
  return carbonFactors[countryCode] || carbonFactors.US; // Default to US if country not found
};

export const calculateEmission = (
  activity: string,
  category: string,
  amount: number,
  countryCode: string = 'US'
): number => {
  const factors = getCountryFactor(countryCode);
  
  switch (category) {
    case 'electricity':
      return amount * factors.electricity;
    case 'transport':
      return amount * factors.transport[activity as keyof typeof factors.transport];
    case 'food':
      return amount * factors.food[activity as keyof typeof factors.food];
    default:
      return 0;
  }
};

export const getAvailableCountries = (): Array<{code: string, name: string}> => {
  return Object.entries(carbonFactors).map(([code, data]) => ({
    code,
    name: data.country
  }));
};
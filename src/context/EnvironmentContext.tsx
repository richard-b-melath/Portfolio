import React, { createContext, useContext, useState } from 'react';

export type WeatherType = 'snow' | 'rain' | 'sunny' | 'default';

interface EnvironmentContextType {
  weather: WeatherType;
  setWeather: (w: WeatherType) => void;
  showSnowman: boolean;
  setShowSnowman: React.Dispatch<React.SetStateAction<boolean>>;
  showChristmas: boolean;
  setShowChristmas: React.Dispatch<React.SetStateAction<boolean>>;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined);

export const EnvironmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to winter snowfall as requested!
  const [weather, setWeather] = useState<WeatherType>('snow');
  const [showSnowman, setShowSnowman] = useState(false);
  const [showChristmas, setShowChristmas] = useState(false);

  return (
    <EnvironmentContext.Provider
      value={{
        weather,
        setWeather,
        showSnowman,
        setShowSnowman,
        showChristmas,
        setShowChristmas,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useEnvironment = (): EnvironmentContextType => {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider');
  }
  return context;
};

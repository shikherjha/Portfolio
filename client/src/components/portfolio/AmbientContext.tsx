import { createContext, useContext, useState, ReactNode } from "react";

interface AmbientContextType {
  isAmbient: boolean;
  toggleAmbient: () => void;
}

const AmbientContext = createContext<AmbientContextType | undefined>(undefined);

export function AmbientProvider({ children }: { children: ReactNode }) {
  const [isAmbient, setIsAmbient] = useState(true);

  const toggleAmbient = () => {
    setIsAmbient(prev => !prev);
  };

  return (
    <AmbientContext.Provider value={{ isAmbient, toggleAmbient }}>
      {children}
    </AmbientContext.Provider>
  );
}

export function useAmbient() {
  const context = useContext(AmbientContext);
  if (context === undefined) {
    throw new Error("useAmbient must be used within an AmbientProvider");
  }
  return context;
}
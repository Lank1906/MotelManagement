import React from "react";
import { createContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho context
interface MyContextType {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

function ContextProvider({ children }: ContextProviderProps) {
  const [data, setData] = useState<string>("Initial Data");

  return (
    <MyContext.Provider value={React.useMemo(() => ({ data, setData }), [
      data,
      setData,
    ])}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, ContextProvider };

import { createContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho context
interface MyContextType {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
}

// Tạo context với giá trị mặc định là undefined
const MyContext = createContext<MyContextType | undefined>(undefined);

// Định nghĩa kiểu cho props của ContextProvider
interface ContextProviderProps {
  children: ReactNode;
}

function ContextProvider({ children }: ContextProviderProps) {
  const [data, setData] = useState<string>("Initial Data");

  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, ContextProvider };

import React from "react";
import { createContext, useState } from "react";
import { MyContextType } from "../interface/my_context_type";
import { ContextProviderProps } from "../interface/context_provider_props";

const MyContext = createContext<MyContextType | undefined>(undefined);

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

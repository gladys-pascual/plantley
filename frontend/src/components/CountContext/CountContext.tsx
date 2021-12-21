import * as React from "react";

type State = { count: number };
type CountProviderProps = { children: React.ReactNode };

const CountContext = React.createContext<
  | { state: State; setCount: React.Dispatch<React.SetStateAction<number>> }
  | undefined
>(undefined);

function CountProvider({ children }: CountProviderProps) {
  const [count, setCount] = React.useState(1);
  const value = { state: { count }, setCount };

  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}

function useCount() {
  const context = React.useContext(CountContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { CountProvider, useCount };

// const { state: { count }, setCount } = useCount()

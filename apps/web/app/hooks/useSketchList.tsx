"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Sketch {
  x: number,
  y: number,
  w: number,
  h: number,
}
interface SketchContextType {
  sketchList: Sketch[];
  setSketchList: React.Dispatch<React.SetStateAction<Sketch[]>>;
}

const SketchContext = createContext<SketchContextType | undefined>(undefined);

export const SketchProvider = ({ children }: { children: ReactNode }) => {
  const [sketchList, setSketchList] = useState<Sketch[]>([]);

  return (
    <SketchContext.Provider value={{ sketchList, setSketchList }}>
      {children}
    </SketchContext.Provider>
  );
};

export const useSketchList = () => {
  const context = useContext(SketchContext);
  if (!context) throw new Error("useSketchList must be used within a SketchProvider");
  return context;
};

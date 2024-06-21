import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Produto } from '@/lib/types';

interface ProdutoContextType {
  listaProdutos: Produto[];
  setListaProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export const ProdutoContext = createContext<ProdutoContextType>({
  listaProdutos: [],
  setListaProdutos: () => { },
});

export const ProdutoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);

  const contextValue: ProdutoContextType = {
    listaProdutos,
    setListaProdutos,
  };

  return (
    <ProdutoContext.Provider value={contextValue}>
      {children}
    </ProdutoContext.Provider>
  );
};

export const useProduto = () => {
  const context = useContext(ProdutoContext);
  if (!context) {
    throw new Error('useProduto deve ser usado dentro de um ProdutoProvider');
  }
  return context;
};


"use client"

import { useEffect, useState } from "react";

import axios from "axios";
import { Produto } from "@/lib/types";
import { ListaProdutos } from "./_components/lista-produtos";
import { ProdutoContext } from "@/components/context/produtos-context";

export default function Home() {

  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);

  const fecthProdutos = async () => {
    const response = await axios.get(`/api/produtos/`);
    setListaProdutos(response.data);
  }

  useEffect(() => {
    fecthProdutos();
  }, [])

  return (
    <ProdutoContext.Provider value={{ listaProdutos, setListaProdutos }}>
      <div className="bg-white text-black h-full flex flex-col content-center justify-center items-center px-16 py-16">
        <p>Lista de Produtos</p>
        <ListaProdutos></ListaProdutos>
      </div>
    </ProdutoContext.Provider>
  );
}

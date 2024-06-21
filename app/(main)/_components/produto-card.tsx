import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import { useProduto } from '@/components/context/produtos-context';
import { v4 as uuidv4 } from 'uuid';

import * as DialogPrimitive from "@radix-ui/react-dialog"

export function ProdutoCard() {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('0');
  const [disponivel, setDisponivel] = useState("sim");
  const [descricao, setDescricao] = useState('');

  const { setListaProdutos } = useProduto();

  const fecthProdutos = async () => {
    const response = await axios.get(`/api/produtos/`);
    setListaProdutos(response.data);
  }

  const DialogClose = DialogPrimitive.Close

  const addProduto = async () => {
    const produto = {
      id: uuidv4(),
      nome: nome,
      descricao: descricao,
      valor: Number(valor),
      disponivelParaVenda: disponivel === "sim" ? true : false
    }

    try {
      const response = await axios.post(`/api/produtos/`, produto);
      fecthProdutos();
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Adicionar Produto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              Nome
            </Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="valor" className="text-right">
              Preço
            </Label>
            <Input
              id="valor"
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="disponivel" className="text-right">
              Disponível
            </Label>
            <Select onValueChange={(value) => { setDisponivel(value) }}>
              <SelectTrigger id="disponivel" >
                <SelectValue placeholder={"sim"} />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="true">Sim</SelectItem>
                <SelectItem value="false">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descricao" className="text-right">
              Descrição
            </Label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="col-span-3"
            />
          </div>

        </div>

        <DialogFooter>
          {/* fecha o card depois de adicionado um produto */}
          <DialogPrimitive.Close className="">
            <Button type="submit" onClick={addProduto}>Adicionar produto</Button>
          </DialogPrimitive.Close>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}


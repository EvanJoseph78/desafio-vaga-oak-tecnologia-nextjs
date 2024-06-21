import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ProdutoCard } from "./produto-card"
import { useProduto } from "@/components/context/produtos-context"

export function ListaProdutos() {

  const { listaProdutos } = useProduto();

  return (
    <div className="h-full w-full">
      <Table>
        <TableCaption>Lista de produtos disponíveis</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead className="text-right">Preço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listaProdutos.sort((produtoA, produtoB) => produtoA.valor - produtoB.valor).map((produto) => (
            <TableRow key={produto.id}>
              <TableCell>{produto.nome}</TableCell>
              <TableCell className="text-right">R$ {produto.valor.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ProdutoCard></ProdutoCard>
    </div>
  );
}

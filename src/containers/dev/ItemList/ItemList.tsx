import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Item } from "@/data/items/item.type";
import { useDevItems } from "@/hooks/useDevItems";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

function ItemRow({ item }: { item: Item }) {
  return (
    <TableRow>
      <TableCell>
        <Link
          to={`/dev/items/${item.id}`}
          className="underline text-muted-foreground"
        >
          {item.id}
        </Link>
      </TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.type}</TableCell>
      <TableCell>{item.updatedAt}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size={"icon"} className="size-6">
              <DotsHorizontalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[200px]">
            <DropdownMenuItem>수정</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export function ItemList() {
  const { items } = useDevItems();

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>타입</TableHead>
            <TableHead>마지막 업데이트</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items ? (
            items?.map((item) => <ItemRow key={item.id} item={item} />)
          ) : (
            <TableRow>
              <TableCell>
                <Skeleton className="w-auto h-5" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

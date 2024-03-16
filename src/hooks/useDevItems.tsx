import { Item } from "@/data/items/item.type";
import { client } from "@/libs/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDevItems() {
  const queryClient = useQueryClient();

  const { data, isPending: isGetItemsPending } = useQuery({
    queryKey: ["items"],
    queryFn: () => client.GetItems({}),
  });

  const { mutate, isPending: isMutatePending } = useMutation({
    mutationFn: async (items: Item[]) => {
      await client.PostItems({ items });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });

  return {
    items: data?.items,
    mutate,
    isGetItemsPending,
    isMutatePending,
    isPending: isGetItemsPending || isMutatePending,
  };
}

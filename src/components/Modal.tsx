import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteProductMutation } from "@/store/ProductApi";
import type { FC, ReactNode } from "react";

export const Modal: FC<{ children: ReactNode; title: string; id: string }> = ({
  children,
  title,
  id,
}) => {
  const [deleteProd] = useDeleteProductMutation();

  const handleClick = async (id: string) => {
    console.log(id);
    
    try {
      await deleteProd({id}).unwrap();
    } catch (error) {
      console.error("Ошибка при удалении", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleClick(id);
          }}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>Это действие нельзя отменить.</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive">
              Yes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

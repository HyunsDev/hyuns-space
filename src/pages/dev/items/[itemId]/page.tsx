import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MainHeader } from "@/containers/header/MainHeader";
import { useDevItem } from "@/hooks/useDevItem";
import { useNavigate } from "react-router-dom";
import { UpdateTitle } from "./rows/UpdateTitle";
import { UpdateType } from "./rows/UpdateType";
import { UpdateDescription } from "./rows/UpdateDescription";
import { UpdateURL } from "./rows/UpdateURL";
import { UpdateURLs } from "./rows/UpdateURLs";
import { UpdatePeriod } from "./rows/UpdatePeriod";
import { UpdateRole } from "./rows/UpdateRole";
import { UpdateStacks } from "./rows/UpdateStacks";
import { UpdateBadges } from "./rows/UpdateBadge";
import { UpdateContent } from "./rows/UpdateContent";
import { UpdateUpdatedAt } from "./rows/UpdateUpdatedAt";
import { UpdateCurating } from "./rows/UpdateCurating";

function Back() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate("/dev")} variant={"ghost"}>
      ← 돌아가기
    </Button>
  );
}

function ReflectButton() {
  const { reflect, isReflectPending } = useDevItem();

  return (
    <div className="flex justify-between mt-2">
      <div className=""></div>
      <Button onClick={() => reflect()} disabled={isReflectPending}>
        반영하기
      </Button>
    </div>
  );
}

function EditItem() {
  const { editingItem } = useDevItem();

  return (
    <div className="w-full">
      {editingItem ? (
        <img
          src={
            editingItem?.thumbnailImage ||
            `/items/${editingItem.id}/thumbnail.png`
          }
          className="rounded"
          alt=""
        />
      ) : (
        <Skeleton className="w-full aspect-video" />
      )}
      <div className="py-4 max-w-[720px] w-full m-auto">
        <UpdateTitle />
        <div className="flex flex-col gap-1 py-4">
          <UpdateType />
          <UpdateDescription />
          <UpdatePeriod />
          <UpdateRole />
          <UpdateURL />
          <UpdateURLs />
          <UpdateCurating />
          <UpdateStacks />
          <UpdateBadges />
          <UpdateUpdatedAt />

          <UpdateContent />

          <ReflectButton />
        </div>
      </div>
    </div>
  );
}

export function DevItemPage() {
  return (
    <>
      <MainHeader />
      <div className="max-w-[900px] w-full px-4 mx-auto my-[90px] ">
        <Back />
        <div className="flex flex-col gap-2 mt-2">
          <EditItem />
        </div>
      </div>
    </>
  );
}

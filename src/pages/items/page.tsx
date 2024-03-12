import { PageContainer } from "@/components/PageContainer/PageContainer";
import { MainHeader } from "@/containers/header/MainHeader";

export function ItemsPage() {
  return (
    <>
      <MainHeader />
      <PageContainer>
        <div className="flex justify-center items-center w-full h-full">
          <h1 className="text-4xl font-bold">모두보기 페이지</h1>
        </div>
      </PageContainer>
    </>
  );
}

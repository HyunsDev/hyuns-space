import { PageContainer } from "@/components/PageContainer/PageContainer";
import { BackgroundCanvas } from "@/containers/BackgroundCanvas/BackgroundCanvas";
import { LoadingOverlay } from "@/containers/LoadingOverlay/LoadingOverlay";
import { MainHeader } from "@/containers/header/MainHeader";
import { MainDescriptionSection } from "@/containers/main/sections/description/description";
import { MainHeroSection } from "@/containers/main/sections/hero/hero.section";
import { MainPreviewSection } from "@/containers/main/sections/preview/preview.section";

export function MainPage() {
  return (
    <>
      <MainHeader />
      <PageContainer>
        <LoadingOverlay
          texts={["새로운 상상을 하고", "상상을 현실로 만듭니다"]}
          time={2500}
        />
        <MainHeroSection />
        <MainDescriptionSection />
        <MainPreviewSection />

        <BackgroundCanvas />
        <div className="min-h-[200dvh]"></div>
      </PageContainer>
    </>
  );
}

import { PageContainer } from "@/components/PageContainer/PageContainer";
import { BackgroundCanvas } from "@/containers/BackgroundCanvas/BackgroundCanvas";
import { BottomShadow } from "@/containers/BottomShadow/BottomShadow";
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
        <LoadingOverlay />
        <MainHeroSection />
        <MainDescriptionSection />
        <MainPreviewSection />

        <BackgroundCanvas />
        <BottomShadow startY={0} endY={200} />

        <div className="min-h-[200dvh]"></div>
      </PageContainer>
    </>
  );
}

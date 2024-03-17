import { PageContainer } from "@/components/PageContainer/PageContainer";
import { BackgroundCanvas } from "@/containers/main/BackgroundCanvas/BackgroundCanvas";
import { LoadingOverlay } from "@/containers/main/LoadingOverlay/LoadingOverlay";
import { MainHeader } from "@/containers/share/header/MainHeader";
import { CurationSection } from "@/containers/main/sections/curation/Curation.section";
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

        <CurationSection
          condition={{
            curating: ["primary"],
          }}
          title="Primary 프로젝트"
          description="자신있게 소개하는 메인 프로젝트입니다"
        />

        <CurationSection
          condition={{
            curating: ["secondary"],
          }}
          title="Secondary 프로젝트"
          description="많은 정성을 담은 사이드 프로젝트입니다"
        />

        <CurationSection
          condition={{
            badges: ["isHot"],
          }}
          title="🔥 Hot 프로젝트"
          description="지금도 열심히 개발 중이에요"
        />

        <CurationSection
          condition={{
            curating: ["physics"],
          }}
          title="웹 물리엔진 시리즈"
          description="놀라운 시뮬레이션을 체험해보세요"
        />

        <MainPreviewSection />

        <BackgroundCanvas />
        <div className="h-[100px]"></div>
      </PageContainer>
    </>
  );
}

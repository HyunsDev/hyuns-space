import { PageContainer } from "@/components/PageContainer/PageContainer";
import { AboutContactSection } from "@/containers/about/sections/Contact.section";
import { AboutDescriptionSection } from "@/containers/about/sections/Description.section";
import { AboutHeroSection } from "@/containers/about/sections/Hero.section";
import { AboutICanDoItSection } from "@/containers/about/sections/ICanDoIt.section";
import { AboutMottoSection } from "@/containers/about/sections/Motto.section";
import { AboutStackSection } from "@/containers/about/sections/Stack.section";
import { MainHeader } from "@/containers/share/header/MainHeader";

export function AboutPage() {
  return (
    <>
      <MainHeader />
      <PageContainer>
        <AboutHeroSection />
        <AboutMottoSection />
        <AboutDescriptionSection />
        <AboutStackSection />
        <AboutICanDoItSection />
        <AboutContactSection />
        <AboutMottoSection />
      </PageContainer>
    </>
  );
}

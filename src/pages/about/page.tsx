import { PageContainer } from "@/components/PageContainer/PageContainer";
import { MainHeader } from "@/containers/share/header/MainHeader";
import { motion } from "framer-motion";
import { DoubleArrowDownIcon } from "@radix-ui/react-icons";
import { AnimatedText } from "@/containers/main/AnimatedText/AnimatedText";

import HyunsLogo from "@/assets/hyuns.png";

function HeroSection() {
  return (
    <div className="h-[100dvh] flex justify-center items-center relative px-4">
      <div className="flex flex-col justify-center items-center">
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <img className="size-[80px] rounded-full" src={HyunsLogo} alt="" />
        </motion.div>

        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <div className="text-center text-2xl mt-8 font-light">
            박현우 | Hyuns
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          <div className="text-center text-sm">
            <a
              href="mailto:hyuns@hyuns.dev"
              className="text-muted-foreground hover:underline"
            >
              hyuns@hyuns.dev
            </a>
          </div>

          <div className="text-center text-sm">
            <a
              href="https://github.com/HyunsDev"
              className="text-muted-foreground hover:underline"
              target="_blank"
            >
              Github
            </a>{" "}
            |{" "}
            <a
              href="https://instagram.com/hyunsdev"
              className="text-muted-foreground hover:underline"
              target="_blank"
            >
              Instagram
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-[32px]">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 8 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            duration: 1.2,
          }}
        >
          <DoubleArrowDownIcon className="size-6 text-muted-foreground" />
        </motion.div>
      </div>
    </div>
  );
}

function MotoSection() {
  return (
    <div className="bg-black text-background flex justify-center items-center h-[130px] px-4">
      <div className="flex flex-col">
        <div className="">
          <AnimatedText text={`새로운 상상을 하고,\n상상을 현실로 만듭니다.`} />
        </div>
      </div>
    </div>
  );
}

function DescriptionSection() {
  return (
    <div className="min-h-[100dvh] pt-[200px] pb-[250px] px-4 max-w-[400px] w-full m-auto">
      <motion.div
        initial={{ y: 8, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <h2 className="font-medium text-xl text-center">
          새로운 상상을 하는 몽상가이자,
          <br />
          상상을 현실로 만드는 개발자.
          <br />
          박현우입니다.
        </h2>
      </motion.div>
      <motion.div className="mt-10">
        <div className="text-center flex flex-col gap-4 mt-4 break-keep">
          <motion.p
            initial={{ y: 8, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            내가 상상하는 것을 모두 만들 수 있게 해주는 개발에 흥미를 느껴,
            개발을 시작했습니다.
          </motion.p>

          <motion.p
            initial={{ y: 8, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
          >
            지금은 주로 웹 프론트엔드와, 웹 백엔드를 다루는{" "}
            <span className="text-muted-foreground line-through">
              (자칭, 유니콘)
            </span>{" "}
            풀스택 개발자로 활동하고 있습니다.
          </motion.p>

          <motion.p
            initial={{ y: 8, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            viewport={{ once: true }}
          >
            꼭 개발이 아니더라도, 기획과 디자인과 같이 무언가를 만드는 것에
            필요한 기술을 조금씩 다루고 있습니다.
          </motion.p>

          <motion.p
            initial={{ y: 8, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            viewport={{ once: true }}
          >
            누군가와 새로운 아이디어를 상상하거나, 생각을 나누는 것을 좋아하니,
            언제든지 연락해주세요. 🙌
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export function AboutPage() {
  return (
    <>
      <MainHeader />
      <PageContainer>
        <HeroSection />
        <MotoSection />
        <DescriptionSection />
      </PageContainer>
    </>
  );
}

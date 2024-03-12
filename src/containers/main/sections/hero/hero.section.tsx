import { Title } from "@/components/title/Title";

export function MainHeroSection() {
  return (
    <div className="w-full h-[400px] flex gap-2 items-end justify-center">
      <div className="max-w-max-screen w-full p-4 md:px-8">
        <Title
          fill="hsl(var(--foreground))"
          className="w-[200px] h-[80px] md:w-[300px] md:h-[120px]"
        />
        <div className="flex items-center gap-2 mt-[10px] md:mt-[-20px]">
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            hyuns.space
          </span>
        </div>
      </div>
    </div>
  );
}

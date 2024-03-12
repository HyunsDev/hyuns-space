import HyunsLogo from "@/assets/hyuns.png";

function App() {
  return (
    <div className="w-[100dvh] h-[100dvh] flex items-center justify-center bg-background">
      <div className="flex flex-col justify-start items-center gap-3">
        <img src={HyunsLogo} className="size-[64px] rounded-full" alt="" />
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          hyuns.space
        </code>
        <div className="">현우공간</div>
      </div>
    </div>
  );
}

export default App;

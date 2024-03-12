import { useTheme } from "@/components/themeProvider";
import { cn } from "@/libs/utils";
import { useEffect, useState } from "react";

export function BottomShadow({
  startY,
  endY,
}: {
  startY: number;
  endY: number;
}) {
  const { currentTheme } = useTheme();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log(currentTheme);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 z-30 w-[100dvw] h-[30dvh] bg-gradient-to-t select-none pointer-events-none",
        currentTheme === "dark"
          ? "from-black to-transparent"
          : "from-rgba(0,0,0,0.3) to-transparent"
      )}
      style={{
        opacity: 1 - Math.min(1, (scrollY - startY) / (endY - startY)),
      }}
    ></div>
  );
}

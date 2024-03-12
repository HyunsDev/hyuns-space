import { RecoilRoot } from "recoil";
import { TooltipProvider } from "./components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./router";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./components/themeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RecoilRoot>
        <TooltipProvider delayDuration={400}>
          <BrowserRouter>
            <MainRouter />
          </BrowserRouter>
          <Toaster />
        </TooltipProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;

import { RecoilRoot } from "recoil";
import { TooltipProvider } from "./components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./router";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./components/themeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <TooltipProvider delayDuration={400}>
            <BrowserRouter>
              <MainRouter />
            </BrowserRouter>
            <Toaster />
          </TooltipProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { ThemeProvider } from "./components/themeProvider";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { MainRouter } from "./router";


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

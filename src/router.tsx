import { Route, Routes, useLocation } from "react-router-dom";
import { NotFoundPage } from "./pages/404.page";
import { MainPage } from "./pages/page";
import { ItemsPage } from "./pages/items/page";

import { AnimatePresence } from "framer-motion";
import { ItemPage } from "./pages/items/[itemId]/page";
import { DevPage } from "./pages/dev/page";
import { DevItemPage } from "./pages/dev/items/[itemId]/page";
import { DevItemContentPage } from "./pages/dev/items/[itemId]/content/page";
import { AboutPage } from "./pages/about/page";

export function MainRouter() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/items/:itemId" element={<ItemPage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/dev" element={<DevPage />} />
        <Route path="/dev/items/:itemId" element={<DevItemPage />} />
        <Route
          path="/dev/items/:itemId/content"
          element={<DevItemContentPage />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

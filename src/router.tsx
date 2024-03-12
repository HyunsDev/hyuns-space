import { Route, Routes, useLocation } from "react-router-dom";
import { NotFoundPage } from "./pages/404.page";
import { MainPage } from "./pages/page";
import { ItemsPage } from "./pages/items/page";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ItemPage } from "./pages/items/[itemId].tsx/page";

export function MainRouter() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/items/:itemId" element={<ItemPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

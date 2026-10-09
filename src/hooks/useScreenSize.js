

import { useState, useEffect } from 'react';

export const useScreenSize = () => {
  const [screen, setScreen] = useState("desktop");

  useEffect(() => {
    const updateScreen = () => {
      if (window.innerWidth < 640) setScreen("mobile");
      else setScreen("desktop");
    };
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  return screen;
};
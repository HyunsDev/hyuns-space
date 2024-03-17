export function useIsDevMode() {
  const isDevMode = process.env.NODE_ENV === "development";
  console.log("isDevMode", isDevMode);
  return isDevMode;
}

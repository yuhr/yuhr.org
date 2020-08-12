import { useMediaQuery } from "react-responsive"

export const useResponsive = () =>
  useMediaQuery({ query: "(orientation: portrait)" })
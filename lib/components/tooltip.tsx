import Tippy from "@tippyjs/react"
import { PropsWithChildren } from "react"

export const Tooltip = ({ children, ...props }: PropsWithChildren<{}>) => (
  <Tippy
    placement="bottom"
    animation="shift-away-subtle"
    duration={100}
    {...props}
  >
    <span>{children}</span>
  </Tippy>
)

export default Tooltip
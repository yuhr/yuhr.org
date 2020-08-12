import Tippy, { TippyProps } from "@tippyjs/react"
import { PropsWithChildren } from "react"

export const Tooltip = ({
  children,
  ...props
}: PropsWithChildren<TippyProps>) => (
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
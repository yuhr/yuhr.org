import { motion } from "framer-motion"
import { PropsWithChildren } from "react"

const variants = {
  initial: {
    x: -20,
    opacity: 0,
    transition: { stiffness: 1000 }
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: { stiffness: 1000 }
  }
}

export const Block = ({
  children,
  inline,
  className
}: PropsWithChildren<{ inline?: boolean; className?: string }>) => (
  <motion.div
    variants={variants}
    style={{ display: inline ? "inline-block" : "block" }}
    className={className}
  >
    {children}
  </motion.div>
)

export default Block
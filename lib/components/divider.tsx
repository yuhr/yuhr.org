import { motion } from "framer-motion"

export const Divider = ({ horizontal }: { horizontal?: boolean }) => (
  <motion.div
    variants={{
      initial: {
        ...(horizontal
          ? {
              scaleX: 0,
              originX: 0
            }
          : {
              scaleY: 0,
              originY: 0
            }),
        transition: { stiffness: 1000, duration: 0.5 }
      },
      animate: {
        ...(horizontal
          ? {
              scaleX: 1,
              originX: 0
            }
          : {
              scaleY: 1,
              originY: 0
            }),
        transition: {
          when: "beforeChildren",
          stiffness: 1000,
          duration: 0.5,
          delayChildren: 0.5,
          staggerChildren: 0.1
        }
      }
    }}
  >
    <div>
      <style jsx>{`
        div {
          display: block;
          width: ${horizontal ? "60vw" : "1px"};
          height: ${horizontal ? "1px" : "60vh"};
          background: #cccccc;
        }
      `}</style>
    </div>
  </motion.div>
)

export default Divider
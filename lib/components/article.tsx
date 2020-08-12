import { PropsWithChildren } from "react"
import { motion } from "framer-motion"
import css from "styled-jsx/css"
import { CSSProperties } from "styled-components"
import { useResponsive } from "utils"

const variants = {
  initial: {
    transition: {
      staggerChildren: 0
    }
  },
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
}

const { className, styles } = css.resolve`
  article {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    overflow-y: scroll;
    width: 100%;
    & > :global(div) {
      width: 100%;
    }
    &:not(.mobile) {
      height: 100%;
      & > :global(div) {
        padding: 0 8rem 0 4rem;
        max-height: 100%;
        &::before, &::after {
          content: "";
          display: block;
          height: 20vh;
          width: 100%;
        }
      }
    }
    &.mobile {
      display: block;
      & > :global(div) {
        padding: 1rem 2.5rem;
      }
    }
    & :global(h1) {
      font-weight: 600;
      font-size: 1.5rem;
    }
    & :global(h2) {
      font-weight: 600;
      font-size: 1.25rem;
    }
    & :global(section) {
      line-height: 1.5em;
      margin: 1.5rem 0;
      & :global(a) {
        color: hsl(180, 100%, 25%);
        transition: color 0.1s;
      }
      & :global(a:hover) {
        color: hsl(180, 100%, 10%);
      }
      & :global(a:animate) {
        color: hsl(180, 25%, 50%);
      }
      & :global(p) {
        margin: 0.75em 0;
        hyphens: auto;
        word-break: keep-all;
        line-break: strict;
        word-wrap: break-word;
        overflow-wrap: break-word;
        user-select: text;
      }
      & :global(ul) {
        margin: 1em 1.5em;
        & :global(li) {
          margin: 0.25em 0;
          & > :global(:first-child) {
            position: relative;
            &::before {
              content: "•";
              position: absolute;
              left: -0.75em;
              display: inline-block;
              color: #666460;
            }
          }
        }
      }
    }
  }
`

export const Article = ({
  children,
  title,
  style
}: PropsWithChildren<{
  title?: string
  style?: CSSProperties
}>) => {
  const isMobile = useResponsive()
  return (
    <motion.article
      className={className + (isMobile ? " mobile" : "")}
      variants={variants}
      style={style}
    >
      <div>
        {title && (
          <header>
            <h1>{title}</h1>
          </header>
        )}
        {children}
      </div>
      {styles}
    </motion.article>
  )
}

export default Article
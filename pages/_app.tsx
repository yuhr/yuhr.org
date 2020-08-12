import React, { useState, useCallback } from "react"
import ReactDOM from "react-dom"

if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  import("react-axe").then(axe => {
    axe.default(React, ReactDOM, 1000)
  })
}

import "../public/style.css"
import "tippy.js/dist/tippy.css"
import "tippy.js/animations/shift-away-subtle.css"

import { motion, AnimatePresence } from "framer-motion"
import { AppProps } from "next/app"
import Head from "next/head"
import css from "styled-jsx/css"
import NoSSR from "react-no-ssr"

import Divider from "components/divider"
import Article from "components/article"
import Header from "components/header"
import MDXProvider from "components/mdx-provider"
import { useResponsive } from "utils"

const heightHeader = "12rem"

const { className: classNameHeader, styles: stylesHeader } = css.resolve`
  header {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    &:not(.mobile) {
      padding: 2rem;
      position: fixed;
      top: 0;
      left: 0;
      width: 40%;
      height: 100%;
      align-items: flex-end;
    }
    &.mobile {
      width: 100%;
      height: ${heightHeader};
      align-items: center;
    }
  }
`

const { className: classNameMain, styles: stylesMain } = css.resolve`
  main {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    overflow-y: scroll;
    &:not(.mobile) {
      height: 100%;
      flex-flow: row nowrap;
      margin-left: 40%;
    }
    &.mobile {
      width: 100%;
      height: calc(100% - 12rem);
      flex-flow: column nowrap;
    }
  }
`

export const App = ({ Component, pageProps, router }: AppProps) => {
  const [isEntering, setIsEntering] = useState(true)
  const onAnimationComplete = useCallback(() => setIsEntering(false), [])
  const isMobile = useResponsive()
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>yuhr.org</title>
      </Head>
      <NoSSR>
        <motion.header
          initial="initial"
          animate="animate"
          variants={{
            initial: {
              opacity: 1,
              transition: {
                when: "beforeChildren",
                staggerChildren: 0.05,
                duration: 0.5,
                delay: 0.5
              }
            },
            animate: {
              opacity: 1,
              transition: {
                when: "beforeChildren",
                staggerChildren: 0.05,
                duration: 0,
                delay: 0.5
              }
            }
          }}
          onAnimationComplete={onAnimationComplete}
          className={classNameHeader + (isMobile ? " mobile" : "")}
        >
          <Header />
          {stylesHeader}
        </motion.header>
        <AnimatePresence exitBeforeEnter custom="animate">
          {!isEntering && (
            <motion.main
              initial="initial"
              animate={isEntering ? "initial" : "animate"}
              exit="initial"
              variants={{
                initial: {
                  opacity: 0,
                  transition: {
                    staggerChildren: 0.5
                  }
                },
                animate: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.5
                  }
                }
              }}
              key={router.route}
              className={classNameMain + (isMobile ? " mobile" : "")}
            >
              <Divider horizontal={isMobile} />
              <Article>
                <MDXProvider>
                  <Component {...pageProps} />
                </MDXProvider>
              </Article>
              {stylesMain}
            </motion.main>
          )}
        </AnimatePresence>
      </NoSSR>
    </>
  )
}

export default App
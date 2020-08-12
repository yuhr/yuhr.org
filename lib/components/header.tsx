import { motion } from "framer-motion"
import Link from "next/link"

import Avatar from "components/avatar"
import Block from "components/block"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTwitter,
  faGithub,
  faKeybase,
  IconDefinition
} from "@fortawesome/free-brands-svg-icons"

import Tooltip from "components/tooltip"
import { useResponsive } from "utils"
const SocialIcon = ({
  url,
  icon,
  alt
}: {
  url: string
  icon: IconDefinition
  alt: string
}) => (
  <Tooltip content={alt}>
    <span className="icon">
      <a href={url} aria-label={alt}>
        <FontAwesomeIcon icon={icon} size="lg" />
      </a>
      <style jsx>{`
        span {
          display: inline-block;
          margin: 0.5em 0.25em;
        }
      `}</style>
    </span>
  </Tooltip>
)

export const Header = () => {
  const isMobile = useResponsive()
  return (
    <motion.div
      variants={{
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { delayChildren: 0.75, staggerChildren: 0.05 }
        }
      }}
    >
      <aside className={isMobile ? "mobile" : ""}>
        <div className="avatar">
          <Link href="/">
            <a>
              <Avatar />
            </a>
          </Link>
        </div>
        <div className="info">
          <Block>
            <h1>Yu Shimura</h1>
          </Block>
          <Block>
            <small>
              <a href="mailto:mail@yuhr.org">mail@yuhr.org</a>
            </small>
          </Block>
          <Block inline>
            <SocialIcon
              url="https://twitter.com/qothr"
              icon={faTwitter}
              alt="Twitter"
            />
          </Block>
          <Block inline>
            <SocialIcon
              url="https://keybase.io/yuhr"
              icon={faKeybase}
              alt="Keybase"
            />
          </Block>
          <Block inline>
            <SocialIcon
              url="https://github.com/yuhr"
              icon={faGithub}
              alt="GitHub"
            />
          </Block>
        </div>
        <style jsx>{`
          aside {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            &:not(.mobile) {
              padding: 2rem;
              flex-flow: column nowrap;
            }
            & .avatar {
              display: inline-block;
              border-radius: 50%;
              overflow: hidden;
              width: 6rem;
              max-width: 6rem;
              min-width: 6rem;
              height: 6rem;
              max-height: 6rem;
              min-height: 6rem;
              margin-bottom: 2rem;
            }
            &.mobile {
              flex-flow: row nowrap;
              & .avatar {
                margin-bottom: 0;
                margin-right: 1.25rem;
              }
            }
          }
          aside:not(.mobile) .info {
            text-align: center;
          }
          h1 {
            font-size: 2rem;
            font-weight: 600;
          }
          small {
            color: #969490;
            font-size: unset;
            margin-left: 0.1rem;
          }
        `}</style>
      </aside>
    </motion.div>
  )
}

export default Header
import { MDXProvider as MDXProviderDefault } from "@mdx-js/react"
import Block from "components/block"
import { PropsWithChildren } from "react"
import Link from "next/link"

const components = {
  p: (props: PropsWithChildren<{}>) => (
    <Block>
      <p {...props} />
    </Block>
  ),
  h1: (props: PropsWithChildren<{}>) => (
    <Block>
      <h1 {...props} />
    </Block>
  ),
  h2: (props: PropsWithChildren<{}>) => (
    <Block>
      <h2 {...props} />
    </Block>
  ),
  li: (props: PropsWithChildren<{}>) => (
    <li {...props}>
      <Block>{props.children}</Block>
    </li>
  ),
  a: (props: PropsWithChildren<{ href: string }>) =>
    props.href.startsWith("/") ? (
      <Link {...props}>
        <a>{props.children}</a>
      </Link>
    ) : (
      <a {...props} />
    )
}

export const MDXProvider = ({ children }: PropsWithChildren<{}>) => (
  <MDXProviderDefault components={components}>{children}</MDXProviderDefault>
)

export default MDXProvider
import Head from "next/head"

type Data = {
  title: string
}

export const Meta = ({ data }: { data: Data }) => {
  const { title } = data
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default Meta
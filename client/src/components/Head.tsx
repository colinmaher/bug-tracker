import NextHead from 'next/head'
interface HeadProps {
  title: string
}
const defaultTitle = "Bug Tracker"
const Head: React.FC<HeadProps> = (props) => {
  return (
    <NextHead>
      <title>{props.title || defaultTitle}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    </NextHead>

  )
}
export default Head
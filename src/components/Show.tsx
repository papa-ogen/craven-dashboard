type ShowProps = {
  when: boolean
  fallback?: JSX.Element
  children: JSX.Element
}

const Show = ({ when, fallback, children }: ShowProps) => {
  if (!when) return fallback || <></>
  return children
}

export default Show

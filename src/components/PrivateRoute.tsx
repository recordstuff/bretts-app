import { FC } from "react"

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: FC<Props> = (props) => {
  const {children} = props;

  if (true) {
    window.location.href = "/login"
  }

  return (
    <>
      {children}
    </>
  )
}

export default PrivateRoute
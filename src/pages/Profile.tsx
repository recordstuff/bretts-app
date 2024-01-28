import { Dispatch, FC, SetStateAction, useEffect } from "react"
import { useOutletContext } from "react-router-dom"

const Profile: FC = () => {
    const setPageTitle: Dispatch<SetStateAction<string>> = useOutletContext()

    useEffect(() => {
        setPageTitle('Profile')
    }, [setPageTitle])
    
    return (
    <>
      <p>Hello from the profile page.</p>
    </>
  )
}

export default Profile
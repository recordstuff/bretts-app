import { Dispatch, FC, SetStateAction, useEffect } from "react"
import { useOutletContext } from "react-router-dom"

const Users: FC = () => {
    const setPageTitle: Dispatch<SetStateAction<string>> = useOutletContext()

    useEffect(() => {
        setPageTitle('Users')
    }, [setPageTitle])
    
    return (
    <>
      <p>Users CRUD goes here.</p>
    </>
  )
}

export default Users
import { Dispatch, FC, SetStateAction, useCallback, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { userClient } from "../services/UserClient"

const Users: FC = () => {
    const setPageTitle: Dispatch<SetStateAction<string>> = useOutletContext()

    const getUsers = useCallback(async (): Promise<void> => {
        const users = await userClient.getUsers(1, 1)
    }, [])

    useEffect(() => {
        setPageTitle('Users')
        getUsers()
    }, [setPageTitle, getUsers])
    
    return (
    <>
      <p>Users CRUD goes here.</p>
    </>
  )
}

export default Users
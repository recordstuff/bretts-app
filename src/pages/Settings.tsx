import { Dispatch, FC, SetStateAction, useEffect } from "react"
import { useOutletContext } from "react-router-dom"

const Settings: FC = () => {
    const setPageTitle: Dispatch<SetStateAction<string>> = useOutletContext()

    useEffect(() => {
        setPageTitle('Settings')
    }, [setPageTitle])
    
    return (
    <>
      <p>Administrators are fancier than average people.</p>
    </>
  )
}

export default Settings
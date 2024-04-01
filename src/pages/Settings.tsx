import { Dispatch, FC, SetStateAction, useEffect } from "react"
import { useOutletContext } from "react-router-dom"

const Settings: FC = () => {
    const setPageTitle: Dispatch<SetStateAction<string>> = useOutletContext()

    useEffect(() => {
        setPageTitle('Settings')
    }, [setPageTitle])
    
    return (
    <>
      <p>Put some settings here.</p>
    </>
  )
}

export default Settings
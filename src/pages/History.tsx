import { Dispatch, FC, SetStateAction, useEffect } from "react"
import { useOutletContext } from "react-router-dom"

const History: FC = () => {
    const setPageTitle: Dispatch<SetStateAction<string>> = useOutletContext()

    useEffect(() => {
        setPageTitle('History')
    }, [setPageTitle])
    
    return (
    <>
      <p>History grid with filters goes here.</p>
    </>
  )
}

export default History
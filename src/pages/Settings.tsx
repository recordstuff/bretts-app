import { Dispatch, FC, SetStateAction, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useOutletContext } from "react-router-dom"
import { firstBreadcrumb } from "../reducers/BreadcrumbsSlice"

const Settings: FC = () => {
    const dispatch = useDispatch()
    const setPageTitle: Dispatch<SetStateAction<string>> = useOutletContext()

    useEffect(() => {
        setPageTitle('Settings')
        dispatch(firstBreadcrumb({title:'Settings', url: '/settings'}))
    }, [setPageTitle])
    
    return (
    <>
      <p>Administrators are fancier than average people.</p>
    </>
  )
}

export default Settings
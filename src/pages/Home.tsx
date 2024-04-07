import { Dispatch, FC, SetStateAction, useEffect } from "react"
import { useOutletContext } from "react-router-dom"

const Home: FC = () => {
    const setPageTitle: Dispatch<SetStateAction<string>> = useOutletContext()

    useEffect(() => {
        setPageTitle('Home')
    }, [setPageTitle])

    return (
        <>
            <p>Home is where the heart is.</p>
        </>
    )
}

export default Home
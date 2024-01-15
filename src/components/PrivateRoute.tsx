import { httpClient } from "../HttpClient"
import { FC } from "react"
import Login from "../pages/Login";

interface Props {
    children: React.ReactNode;
}

const PrivateRoute: FC<Props> = (props) => {
    const { children } = props;

    const isAuthenticated = (): boolean => {
        // TODO: check for token expired, whatever else we can easily check
        // real security is on the backend
        return httpClient.token.length > 0;
    }

    return isAuthenticated() ? (
        <>
            {children}
        </>
    ) : <Login />
}

export default PrivateRoute
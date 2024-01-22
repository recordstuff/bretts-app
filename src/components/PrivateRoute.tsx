import { useEffect } from 'react';
import { jwtUtil } from "../services/JwtUtil"
import { FC } from "react"
import { useNavigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

const PrivateRoute: FC<Props> = (props) => {
    const { children } = props;
    const isAuthenticated = !jwtUtil.isExpired
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, []);

    return (
        <>
            {isAuthenticated && children}
        </>
    )
}

export default PrivateRoute
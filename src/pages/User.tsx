import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { roleClient } from "../services/RoleClient"
import { userClient } from "../services/UserClient"
import { UserDetail, emptyUserDetail } from "../models/UserDetail"
import { doneWaiting, pleaseWait } from "../reducers/WaitSpinnerSlice"
import { useDispatch } from "react-redux"
import { Button, Stack, TextField, Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import { addBreadcrumb } from "../reducers/BreadcrumbsSlice"
import ItemsSelector from "../components/ItemsSelector"
import { NameGuidPair } from "../models/NameGuidPair"
import { useNavigate } from 'react-router-dom';

const User: FC = () => {

    const dispatch = useDispatch()
    const setPageTitle: Dispatch<SetStateAction<string>> = useOutletContext()
    const [roles, setRoles] = useState<NameGuidPair[]>([])
    const [user, setUser] = useState<UserDetail>(emptyUserDetail())
    const { id } = useParams();
    const navigate = useNavigate();

    const getRoles = useCallback(async (): Promise<void> => {
        dispatch(pleaseWait())

        setRoles(await roleClient.getRoles())

        dispatch(doneWaiting())
    }, [dispatch])

    const getUser = useCallback(async (): Promise<void> => {
        if (id === undefined) return

        dispatch(pleaseWait())

        setUser(await userClient.getUser(id))

        dispatch(doneWaiting())
    }, [dispatch, id])

    useEffect(() => {
        let pageTitle
        let url = '/user'

        if (id === undefined) {
            pageTitle = 'Add User'
        }
        else {
            pageTitle = 'Edit User'
            url = `${url}/${id}`
        }

        setPageTitle(pageTitle)
        dispatch(addBreadcrumb({ title: pageTitle, url }))
        getRoles()
        getUser()
    }, [id, setPageTitle, dispatch, getRoles, getUser])

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        let newUser = { ...user }
        newUser[event.target.name as keyof UserDetail] = event.target.value as any
        setUser(newUser)
    }

    const upsert = async (): Promise<void> => {
        if (id === undefined) return

        dispatch(pleaseWait())

        setUser(await userClient.updateUser(user))

        dispatch(doneWaiting())
    }

    const handleCancel = (): void => {
        if (id === undefined) {
            navigate(-1)
        }
        else {
            getUser()
        }
    }

    return (
        <Stack margin={2} spacing={4}>
            <TextField fullWidth label="Id" value={user.Guid} disabled />
            <TextField fullWidth label="Display Name" name='DisplayName' onChange={handleChange} value={user.DisplayName} />
            <TextField fullWidth label="Email" name='Email' onChange={handleChange} value={user.Email} />
            <TextField fullWidth label="Phone" name='Phone' onChange={handleChange} value={user.Phone} />
            <ItemsSelector
                label="Roles"
                allItems={roles}
                initiallySelectedItems={user.Roles}
            />
            <Stack direction='row' spacing={2}>
                <Button onClick={upsert} color='primary' variant="contained">{id === undefined ? 'Add' : 'Save'}</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </Stack>
        </Stack>
    )
}

export default User

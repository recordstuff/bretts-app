import { FC, useEffect, useState } from 'react';
import { NameGuidPair } from '../models/NameGuidPair';
import FilteredList from './FilteredList';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

export interface Props {
    allItems: NameGuidPair[]
    initiallySelectedItems: NameGuidPair[]
    label: string
}

const ItemsSelector: FC<Props> = ({ allItems, initiallySelectedItems, label }) => {

    const [available, setAvailable] = useState<NameGuidPair[]>([])
    const [selected, setSelected] = useState<NameGuidPair[]>([])

    useEffect(() => {
        setSelected(initiallySelectedItems)
        setAvailable(allItems.filter(ai => !initiallySelectedItems.some(isi => isi.Guid === ai.Guid)))
    }, [allItems, initiallySelectedItems])

    return (
            <Box>
            <Typography paddingTop={1} paddingBottom={.5}>{label}</Typography>
            <Grid container direction='row'>
            <Grid item sm={12} md={5}>
                    <FilteredList
                        label='Selected'
                        items={selected}
                    />
                </Grid>
                <Grid item sm={12} md={2}>
                    <Stack spacing={2} padding={2}>
                    <Button variant='outlined'>{'>>'}</Button>
                    <Button variant='outlined'>{'<<'}</Button>
                    </Stack>
                </Grid>
                <Grid item sm={12} md={5}>
                    <FilteredList
                        label='Available'
                        items={available}
                    />
                </Grid>
            </Grid>
            </Box>
    )
}

export default ItemsSelector
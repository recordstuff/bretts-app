import { FC, useEffect, useState } from 'react';
import { NameGuidPair } from '../models/NameGuidPair';
import FilteredList from './FilteredList';
import { Grid, Typography } from '@mui/material';

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
        <>
            <Typography>{label}</Typography>
            <Grid container>
                <Grid item>
                    <FilteredList
                        label='Available'
                        items={available}
                    />
                </Grid>
                <Grid item>
                    <FilteredList
                        label='Selected'
                        items={selected}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default ItemsSelector
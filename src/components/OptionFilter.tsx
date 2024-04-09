import { Dispatch, FC, SetStateAction, useEffect, useId } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

export interface FilterOption<T> {
    Name: string,
    Value: T
}

export interface Props<T> {
    label: string,
    options: FilterOption<T>[],
    setFilterOption: Dispatch<SetStateAction<T>>,
    filterOption: T,
}

function OptionFilter<T>({ options, label, setFilterOption, filterOption }: Props<T>) {
    const labelId = useId();

    const handleChange = (event: SelectChangeEvent) => {
        setFilterOption(event.target.value as T)
    }

    return (
        <FormControl fullWidth>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                label={label}
                onChange={handleChange}
                value={`${filterOption}`}
            >
                {options.map((row, index) => (
                    <MenuItem key={index} value={`${row.Value}`}>{row.Name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default OptionFilter
import React from 'react';
import {TextField} from "@material-ui/core";
import {useFormContext} from "react-hook-form";

type Props = {
    name: string
    placeholder: string
};

const FormField: React.FC<Props> = ({name,placeholder}) => {
    const {register, formState} = useFormContext();
    return (
        <TextField {...register(name)}
                   placeholder={placeholder}
                   name={name}
                   size={"small"}
                   variant={"outlined"}
                   helperText={formState.errors[name]?.message}
                   fullWidth
                   required/>
    );
};

export default FormField;

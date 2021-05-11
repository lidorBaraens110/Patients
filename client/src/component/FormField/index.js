import React from 'react';
import TextField from './TextField';
import SelectField from './SelectField';

const FormField = ({ type, name, required, label, options, onChange, min, max }) => {

    switch (type) {
        case 'String': {
            if (options) {
                return (
                    <SelectField name={name} required={required} label={label}
                        options={options}
                        onChange={onChange}
                    />
                );
            }
            return (
                <TextField name={name} required={required} label={label} onChange={onChange} />
            );
        }
        case 'Number':
            return <TextField name={name} min={min} max={max} required={required} label={label} type="number" onChange={onChange} />
        default:
            return null;
    }
};

export default FormField;
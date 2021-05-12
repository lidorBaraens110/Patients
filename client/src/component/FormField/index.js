import React from 'react';
import TextField from './TextField';
import SelectField from './SelectField';

const FormField = ({ type, name, required, label, options, onChange, min, max, currentValue }) => {

    switch (type) {
        case 'String': {
            if (options) {
                return (
                    <SelectField name={name} required={required} label={label}
                        currentValue={currentValue}
                        options={options}
                        onChange={onChange}
                    />
                );
            }
            return (
                <TextField name={name}
                    required={required}
                    label={label}
                    onChange={onChange}
                    currentValue={currentValue} />
            );
        }
        case 'Number':
            return <TextField name={name} min={min} max={max} required={required} label={label} type="number" onChange={onChange} currentValue={currentValue} />
        default:
            return null;
    }
};

export default FormField;
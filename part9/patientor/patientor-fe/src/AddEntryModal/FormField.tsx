import { Diagnosis, HealthCheckRating } from '../types';
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik';
import { FormControl, InputLabel, MenuItem, Select, TextField as TextFieldMUI, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Input from '@material-ui/core/Input';

export type HelthCheckRatingOption = {
  value: HealthCheckRating;
  label: string;
}

type SelectFieldProps = {
  name: string;
  label: string;
  options: HelthCheckRatingOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => <Select {...field} {...props} />;

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
        >
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max }: NumberProps) => {
  const [value, setValue] = useState<number>();

  return (
    <div style={{ marginBottom: "1em" }}>
      <TextFieldMUI
        fullWidth
        label={label}
        placeholder={String(min)}
        type="number"
        {...field}
        value={value}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value === undefined) return;
          if (value > max) setValue(max);
          else if (value <= min) setValue(min);
          else setValue(Math.floor(value));
        }}
      />
      <Typography
        variant="subtitle2"
        style={{ color: "red" }}
      >
        <ErrorMessage name={field.name}/>
      </Typography>
    </div>
  );
};

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
  const field = "diagnosisCodes";
  const onChange = (data: string[]) => {
    setDiagnoses([...data]);
    setFieldTouched(field, true);
    setFieldValue(field, data);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <FormControl style={{ width: 552, marginBottom: '30px' }}>
      <InputLabel>Diagnoses</InputLabel>
      <Select
        name={field}
        multiple
        value={selectedDiagnoses}
        onChange={(e) => onChange(e.target.value as string[])}
        input={<Input/>}
      >
        {stateOptions.map((option) => (
          <MenuItem
            key={option.key}
            value={option.value}
          >
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field}/>
    </FormControl>
  );
};

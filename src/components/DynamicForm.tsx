import React, { useState, useEffect } from 'react';
import { Button, Checkbox, FormControlLabel, TextField, Grid, Box } from '@mui/material';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

interface FieldConfig {
  name: string;
  label: string;
  type: string;
  min?: number;
  max?: number;
  defaultValue: any;
}

interface FormConfig {
  fields: FieldConfig[];
  submitButton: {
    label: string;
  };
}

interface DynamicFormProps {
  config: FormConfig;
  schema: object;
  onSubmit: (data: any) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ config, schema, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);

  useEffect(() => {
    const initialData: Record<string, any> = {};
    config.fields.forEach((field) => {
      initialData[field.name] = field.defaultValue;
    });
    setFormData(initialData);
  }, [config]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate(formData);
    if (isValid) {
      setErrors({});
      onSubmit(formData);
    } else {
      const newErrors: Record<string, string> = {};
      validate.errors?.forEach((error) => {
        newErrors[error.instancePath.slice(1)] = error.message || 'Invalid input';
      });
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {config.fields.map((field) => (
          <Grid item xs={12} sm={field.type === 'checkbox' ? 6 : 12} key={field.name}>
            {field.type === 'checkbox' ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData[field.name] || false}
                    onChange={handleInputChange}
                    name={field.name}
                  />
                }
                label={field.label}
              />
            ) : (
              <TextField
                fullWidth
                type={field.type}
                label={field.label}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                inputProps={{ min: field.min, max: field.max }}
                error={!!errors[field.name]}
                helperText={errors[field.name]}
              />
            )}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {config.submitButton.label}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default DynamicForm;

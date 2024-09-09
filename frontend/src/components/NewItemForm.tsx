import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

type NewItemFormProps = {
  onSubmit: (title: string, nextDue: string, currentHours: number) => void;
};

const NewItemForm: React.FC<NewItemFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmitForm = (data: any) => {
    onSubmit(data.title, data.nextDue, parseFloat(data.currentHours));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: 'Title is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Title"
              variant="outlined"
              fullWidth
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="nextDue"
          control={control}
          defaultValue=""
          rules={{ required: 'Next due date is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Next Due (YYYY-MM-DD H: 0)"
              variant="outlined"
              fullWidth
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="currentHours"
          control={control}
          defaultValue=""
          rules={{ required: 'Current hours is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Current Hours"
              variant="outlined"
              fullWidth
              type="number"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Item
        </Button>
      </Box>
    </form>
  );
};

export default NewItemForm;

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type NewPostFormProps = {
  onSubmit: (title: string, body: string, author: string) => void;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmitForm = (data: any) => {
    const htmlBody = draftToHtml(convertToRaw(data.body.getCurrentContent()));
    onSubmit(data.title, htmlBody, data.author);
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
          name="author"
          control={control}
          defaultValue=""
          rules={{ required: 'Author is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Author"
              variant="outlined"
              fullWidth
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="body"
          control={control}
          defaultValue={EditorState.createEmpty()}
          rules={{ required: 'Body is required' }}
          render={({ field }) => (
            <Editor
              editorState={field.value}
              onEditorStateChange={field.onChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Post
        </Button>
      </Box>
    </form>
  );
};

export default NewPostForm;

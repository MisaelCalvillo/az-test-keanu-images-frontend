import React from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { CircularProgress, Paper, Typography, Box, Grid, AppBar, Toolbar, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { KeanuImageParams, KeanuImageData } from '../types';
import DynamicForm from './DynamicForm';
import formConfig from '../config/keanuImageFormConfig.json';
import formSchema from '../schemas/keanuImageFormSchema.json';

const GET_KEANU_IMAGE = gql`
  query GetKeanuImage($width: Int!, $height: Int!, $young: Boolean!, $grayscale: Boolean!) {
    fetchKeanuImage(width: $width, height: $height, young: $young, grayscale: $grayscale)
  }
`;

const KeanuImageForm: React.FC = () => {
  const [getImage, { loading, error, data }] = useLazyQuery<KeanuImageData, KeanuImageParams>(GET_KEANU_IMAGE);

  const handleSubmit = (formData: KeanuImageParams) => {
    getImage({ variables: formData });
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeigh: 'bold' }}>
            Keanu Reeves Image Retrieval
          </Typography>
          <IconButton
            color="inherit"
            aria-label="github repository"
            component={Link}
            href="https://github.com/MisaelCalvillo/az-test-keanu-images-frontend"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: 'calc(100vh - 64px)' }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
              <DynamicForm
                config={formConfig}
                schema={formSchema}
                onSubmit={handleSubmit}
              />
              {loading && (
                <Box display="flex" justifyContent="center" mt={2}>
                  <CircularProgress />
                </Box>
              )}
              {error && (
                <Typography color="error" sx={{ mt: 2 }} align="center">
                  Error: {error.message}
                </Typography>
              )}
              {data && (
                <Box mt={3} textAlign="center">
                  <img
                    src={`data:image/svg+xml;base64,${data.fetchKeanuImage}`}
                    alt="Keanu Reeves"
                    style={{ maxWidth: '100%'}}
                  />
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default KeanuImageForm;
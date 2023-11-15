'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import TagCreate from 'src/sections/dashboard/create-tags/tag-create-form';

const Page = () => {
  usePageView();

  return (
    <>
      <Seo title="Dashboard: Fleet Create" />
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexGrow: 1,
        }}
      >
        <Grid
          container
          sx={{ flexGrow: 1 }}
        >
          <Grid
            xs={12}
            md={5}
            sm={4}
            sx={{
              backgroundImage: 'url(/assets/admin/tag.svg)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              display: {
                xs: 'none',
                md: 'block',
              },
            }}
          />
          <Grid
            xs={12}
            md={7}
            sx={{
              p: {
                xs: 2,
                sm: 4,
                md: 4,
              },
            }}
          >
            <Stack
              maxWidth="sm"
              spacing={3}
            >
              <Typography variant="h4">Add Tag</Typography>
              <TagCreate />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Page;
 
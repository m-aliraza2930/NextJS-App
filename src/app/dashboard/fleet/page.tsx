'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import FleetCreate  from 'src/sections/dashboard/fleet/fleet-create-form';
import { fleetAPI } from 'src/api/fleet';
import { useEffect } from 'react';

const Page =  () => {
  usePageView();
  const  viewMap = async() =>{
    const data= await fleetAPI.fleetMapView();
  }
  useEffect(()=>{
    viewMap()
  },[])

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
              backgroundImage: 'url(/assets/dummyMap.svg)',
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
              <Typography variant="h4">Create a Fleet</Typography>
              <FleetCreate />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Page;

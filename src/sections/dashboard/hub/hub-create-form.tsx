import { Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import { FC } from 'react';

export const HubCreate: FC = () => {
  return (
    <form>
      <Card>
        <CardHeader title="Set up a new Hub">
          <CardContent sx={{ pt: 0 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Asset Name*"
                  name="name"
                  placeholder='Required'
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Asset Type*"
                  name="name"
                  placeholder='Required'
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Model Number"
                  name="name"
                  placeholder='Optional'
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Serial Number"
                  name="name"
                  placeholder='Optional'
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <label>Description</label><br/>
               <textarea name='' placeholder='optional'></textarea>
              </Grid>
            </Grid>
          </CardContent>
        </CardHeader>
      </Card>
    </form>
  );
};

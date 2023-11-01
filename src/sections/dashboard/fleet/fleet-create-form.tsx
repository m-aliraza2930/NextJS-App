import { Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import { FC } from 'react';

export const FleetCreate: FC = () => {
  return (
    <form>
      <Card>
        <CardHeader title="Create Fleet">
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
                  label="Full name"
                  name="name"
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Full name"
                  name="name"
                />
              </Grid>
            </Grid>
          </CardContent>
        </CardHeader>
      </Card>
    </form>
  );
};

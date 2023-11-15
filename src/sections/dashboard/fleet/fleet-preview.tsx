import type { FC } from 'react';
import CheckIcon from '@untitled-ui/icons-react/build/esm/Check';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

export const JobPreview: FC = () => (
  <Stack spacing={2}>
    <div>
      <Avatar
        sx={{
          backgroundColor: 'success.main',
          color: 'success.contrastText',
          height: 40,
          width: 40,
        }}
      >
        <SvgIcon>
          <CheckIcon />
        </SvgIcon>
      </Avatar>
      <Typography
        variant="h6"
        sx={{ mt: 2 }}
      >
        All done!
      </Typography>
      <Typography
        color="text.secondary"
        variant="body2"
      >
        Your fleet is ready.
      </Typography>
    </div>
    <Stack
      alignItems="center"
      direction="row"
      flexWrap="wrap"
      justifyContent="space-between"
      sx={{
        px: 2,
        py: 1.5,
      }}
    >
      <Button variant="contained">Go to Fleet</Button>
    </Stack>
  </Stack>
);

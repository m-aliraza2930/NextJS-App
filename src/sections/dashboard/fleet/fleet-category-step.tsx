import type { FC } from 'react';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

interface JobCategoryStepProps {
  onNext?: () => void;
  onBack?: () => void;
}

export const JobCategoryStep: FC<JobCategoryStepProps> = (props) => {
  const { onBack, onNext, ...other } = props;

  return (
    <Stack
      spacing={3}
      {...other}
    >
      <div>
        <Typography variant="h6">Please enter fleet information</Typography>
      </div>

      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Name *"
          name="name"
          type="text"
        />
        <TextField
          fullWidth
          label="Deacription"
          name="description"
          type="text"
        />
      </Stack>

      <div>
        <Button
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          onClick={onNext}
          variant="contained"
        >
          Continue
        </Button>
      </div>
    </Stack>
  );
};

JobCategoryStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};

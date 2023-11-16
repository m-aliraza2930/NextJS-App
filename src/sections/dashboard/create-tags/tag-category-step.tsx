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

interface CategoryOption {
  description: string;
  title: string;
  value: string;
}

const categoryOptions: CategoryOption[] = [
  {
    description: 'Best for small, friendly-pocket projects',
    title: 'Freelancers',
    value: 'freelancers',
  },
  {
    description: 'Limited-time projects with highly experienced individuals',
    title: 'Contractor',
    value: 'contractor',
  },
  {
    description: 'Unlimited term contracts',
    title: 'Employees',
    value: 'employees',
  },
];

interface JobCategoryStepProps {
  onNext?: () => void;
  onBack?: () => void;
}

const JobCategoryStep: FC<JobCategoryStepProps> = (props) => {
  const { onBack, onNext, ...other } = props;
  const [category, setCategory] = useState<string>(categoryOptions[1].value);

  const handleCategoryChange = useCallback((category: string): void => {
    setCategory(category);
  }, []);

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
          label="10-Digit MAC Address"
          name="name"
          type="text"
          placeholder='BCF980D822'
        />
        <TextField
          fullWidth
          label="Deacription"
          name="6-Digit ID"
          type="text"
          placeholder='481676'
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
export default JobCategoryStep;
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
    description: 'For storage boxes and other mobile containers',
    title: 'Wireless',
    value: 'Wireless',
  },
  {
    description: 'For trucks, vans, and other types of vehicles',
    title: 'Wired',
    value: 'Wired',
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
        <Typography variant="h6">Please enter the 10-digit Hub ID</Typography>
       
      </div>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Hub ID"
          name="name"
          type="text"
          placeholder="98765432987"
        />
      </Stack> 
      <Typography variant="h6">Specify Hub Type</Typography>
      <Stack spacing={2}>
        {categoryOptions.map((option) => (
          <Card
            key={option.value}
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
              display: 'flex',
              p: 2,
              ...(category === option.value && {
                backgroundColor: 'primary.alpha12',
                boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
              }),
            }}
            onClick={(): void => handleCategoryChange(option.value)}
            variant="outlined"
          >
            <Stack
              direction="row"
              spacing={2}
            >
              <Radio
                checked={category === option.value}
                color="primary"
              />
              <div>
                <Typography variant="subtitle1">{option.title}</Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  {option.description}
                </Typography>
              </div>
            </Stack>
          </Card>
        ))}
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
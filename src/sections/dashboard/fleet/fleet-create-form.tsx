import type { FC } from 'react';
import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@untitled-ui/icons-react/build/esm/Check';
import Avatar from '@mui/material/Avatar';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import type { StepIconProps } from '@mui/material/StepIcon';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const StepIcon: FC<StepIconProps> = (props) => {
  const { active, completed, icon } = props;

  const highlight = active || completed;

  return (
    <Avatar
      sx={{
        height: 40,
        width: 40,
        ...(highlight && {
          backgroundColor: '#F7C600',
          color: 'primary.contrastText',
        }),
      }}
      variant="rounded"
    >
      {completed ? (
        <SvgIcon>
          <CheckIcon />
        </SvgIcon>
      ) : (
        icon
      )}
    </Avatar>
  );
};

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node.isRequired,
};

export const FleetCreate: FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const handleNext = useCallback(() => {
    setActiveStep((prevState) => prevState + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevState) => prevState - 1);
  }, []);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
  }, []);

  const steps = useMemo(() => {
    return [
      {
        label: 'FLEET DETAILS',
      },
    ];
  }, [handleBack, handleNext, handleComplete]);

  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      sx={{
        '& .MuiStepConnector-line': {
          borderLeftColor: 'divider',
          borderLeftWidth: 2,
          ml: 1,
        },
      }}
    >
      {steps.map((step, index) => {
        const isCurrentStep = activeStep === index;

        return (
          <Step key={step.label}>
            <StepLabel StepIconComponent={StepIcon}>
              <Typography
                sx={{ ml: 2 }}
                variant="overline"
              >
                FLEET DETAILS
              </Typography>
            </StepLabel>
            <StepContent
              sx={{
                fontWeight: 'bold',
                borderLeftColor: 'divider',
                borderLeftWidth: 2,
                ml: '20px',
                ...(isCurrentStep && {
                  py: 4,
                }),
              }}
            >
              Please enter fleet information
            </StepContent>
            <TextField
              autoFocus
              fullWidth
              label="Name *"
              name="name"
              type="text"
              sx={{ marginLeft: '40px', width: '90%', marginBottom: '20px' }}
            />
            <TextField
              autoFocus
              fullWidth
              label="Description"
              name="description"
              type="text"
              sx={{ marginLeft: '40px', width: '90%', marginBottom: '40px' }}
            />

            <Button
              sx={{ marginLeft: '40px' }}
              endIcon={
                <SvgIcon>
                  <CheckIcon />
                </SvgIcon>
              }
              // onClick={onNext}
              variant="contained"
            >
              Create Fleet
            </Button>

            <Button

            // onClick={onBack}
            >
              Back
            </Button>
          </Step>
        );
      })}
    </Stepper>
  );
};

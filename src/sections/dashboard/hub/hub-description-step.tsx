import type { FC } from 'react';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { QuillEditor } from 'src/components/quill-editor';

interface JobDescriptionStepProps {
  onBack?: () => void;
  onNext?: () => void;
}

const JobDescriptionStep: FC<JobDescriptionStepProps> = (props) => {
  const { onBack, onNext, ...other } = props;
  const [content, setContent] = useState<string>('');

  const handleContentChange = useCallback((value: string): void => {
    setContent(value);
  }, []);

  return (
    <Stack
      spacing={3}
      {...other}
    >
      <div>
        <Typography variant="h6">Please enter asset information</Typography>
      </div>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Name *"
          name="name"
          type="text"
          placeholder="XyzAbc"
        />
      </Stack>

      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Type *"
          name="type"
          type="text"
          placeholder="A"
        />
      </Stack>

      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Model Number"
          name="model"
          type="text"
          placeholder="98765432987"
        />
      </Stack>

      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Serial Number"
          name="serial"
          type="text"
          placeholder="98765432987"
        />
      </Stack>

      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Description"
          name="description"
          type="text"
          placeholder="This is Description"
        />
      </Stack>

      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
      >
        <Button
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          onClick={onNext}
          variant="contained"
        >
          Add hub
        </Button>
        <Button
          color="inherit"
          onClick={onBack}
        >
          Add Another
        </Button>
      </Stack>
    </Stack>
  );
};

JobDescriptionStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};
export default JobDescriptionStep;
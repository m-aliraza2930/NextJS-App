import type { FC } from 'react';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMounted } from 'src/hooks/use-mounted';
import { useRouter } from 'src/hooks/use-router';
import toast from 'react-hot-toast';

import { QuillEditor } from 'src/components/quill-editor';
import { hubAPI } from 'src/api/hub';

interface Values {
  imei: string;
  version: string;
  fleetId: string;
  submit: null;
}

const initialValues: Values = {
  imei: '',
  version: '',
  fleetId: '',
  submit: null,
};
const validationSchema = Yup.object({
  imei: Yup.string().required('imei is required'),
  version: Yup.string().max(255).required('version is required'),
  fleetId: Yup.string().required('fleetId is required'),
});
interface JobDescriptionStepProps {
  onBack?: () => void;
  onNext?: () => void;
}

const JobDescriptionStep: FC<JobDescriptionStepProps> = (props) => {
  const { onBack, onNext, ...other } = props;
  const isMounted = useMounted();
  const [content, setContent] = useState<string>('');
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const data= await hubAPI.createHub(values);
        // await signIn(values.email, values.password);
        if (isMounted()) {
          toast.success("Hub created successfully")
          console.log("iam in mount")
          if (onNext && typeof onNext === 'function') {
            onNext();
          }
        }
      } catch (err) {
        console.error(err);
        toast.error(err?.response?.data?.error?.message);
        if (isMounted()) {
          helpers.setStatus({ success: false });
          // helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });
  const handleContentChange = useCallback((value: string): void => {
    setContent(value);
  }, []);

  return (
     <form noValidate
     onSubmit={formik.handleSubmit}>
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
          label="IMEI *"
          name="imei"
          type="text"
          error={!!(formik.touched.imei && formik.errors.imei)}
          helperText={formik.touched.imei && formik.errors.imei}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.imei}
          // placeholder="imei"
        />
      </Stack>

      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Version *"
          name="version"
          type="text"
          error={!!(formik.touched.version && formik.errors.version)}
          helperText={formik.touched.version && formik.errors.version}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.version}
          // placeholder="version"
        />
      </Stack>

      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Fleet ID"
          name="fleetId"
          type="text"
          error={!!(formik.touched.fleetId && formik.errors.fleetId)}
          helperText={formik.touched.fleetId && formik.errors.fleetId}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.fleetId}
          // placeholder="98765432987"
        />
      </Stack>

      {/* <Stack spacing={3}>
        <TextField
          fullWidth
          label="Serial Number"
          name="serial"
          type="text"
          placeholder="98765432987"
        />
      </Stack> */}

      {/* <Stack spacing={3}>
        <TextField
          fullWidth
          label="Description"
          name="description"
          type="text"
          placeholder="This is Description"
        />
      </Stack> */}

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
          variant="contained"
          type='submit'
          disabled={formik.isSubmitting}
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
    </form>
  );
};

JobDescriptionStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};
export default JobDescriptionStep;

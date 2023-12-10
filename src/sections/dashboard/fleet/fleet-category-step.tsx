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
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMounted } from 'src/hooks/use-mounted';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import { fleetAPI } from 'src/api/fleet';
import toast from 'react-hot-toast';

interface JobCategoryStepProps {
  onNext?: () => void;
  onBack?: () => void;
}

interface Values {
  name: string;
  description: string;
  submit: null;
}

const initialValues: Values = {
  name: '',
  description: '',
  submit: null,
};
const validationSchema = Yup.object({
  name: Yup.string().required('name is required'),
  description: Yup.string().max(255).required('description is required'),
});

export const JobCategoryStep: FC<JobCategoryStepProps> = (props) => {
  const { onBack, onNext, ...other } = props;
  const isMounted = useMounted();
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const data= await fleetAPI.createFleet(values);
        // await signIn(values.email, values.password);
        if (isMounted()) {
          toast.success("Fleet created successfully")
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
  return (
    <form  noValidate
              onSubmit={formik.handleSubmit}
              >
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
          error={!!(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          type="text"
          error={!!(formik.touched.description && formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.description}
        />
      </Stack>

      <div>
        <Button
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          // onClick={onNext}
          variant="contained"
          type='submit'
          disabled={formik.isSubmitting}
        >
          Continue
        </Button>
      </div>
    </Stack>
    </form>

  );
};

JobCategoryStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};

'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';

import { Seo } from 'src/components/seo';
import type { AuthContextType } from 'src/contexts/auth/amplify';
import { useAuth } from 'src/hooks/use-auth';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/components/router-link';
import { authApi } from 'src/api/auth';
import toast from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
interface Values {
  email: string;
  submit: null;
}

const initialValues: Values = {
  email: '',
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const { forgotPassword } = useAuth<AuthContextType>();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const response = await authApi.forgotPassword(values.email);
        toast.success(response.message);

        if (isMounted()) {
          const searchParams = new URLSearchParams({ username: values.email }).toString();
          const href = paths.auth.jwt.resetPassword + `?${searchParams}`;
          router.push(href);
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

  usePageView();

  return (
    <>
      <Seo title="Forgot Password" />
      <div>
        <Card elevation={16}>
          <CardHeader
            sx={{ pb: 0 }}
            title="Forgot password"
          />
          <CardContent>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <TextField
                autoFocus
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
              />
              {/* {formik.errors.submit && (
                <FormHelperText
                  error
                  sx={{ mt: 3 }}
                >
                  {formik.errors.submit as string}
                </FormHelperText>
              )} */}
              {/* <Link
                component={RouterLink}
                href={paths.auth.jwt.resetPassword}
                underline="hover"
                variant="subtitle2"
              > */}
              {formik.isSubmitting ? (
                <Button
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="button"
                  variant="contained"
                >
                  <CircularProgress size={25} />
                </Button>
              ) : (
                <Button
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Send OTP
                </Button>
              )}
              {/* </Link> */}
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;

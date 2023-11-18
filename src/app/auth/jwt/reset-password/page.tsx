'use client';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import type { AuthContextType } from 'src/contexts/auth/amplify';
import { useAuth } from 'src/hooks/use-auth';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useRouter } from 'src/hooks/use-router';
import { useSearchParams } from 'src/hooks/use-search-params';
import { paths } from 'src/paths';
import { authApi } from 'src/api/auth';
import toast from 'react-hot-toast';

interface Values {
  // code: string;
  email: string;
  newPassword: string;
  oneTimeCode: string;
  submit: null;
}

const  initialValues: Values = {
  email: '',
  newPassword: '',
  oneTimeCode: '',
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  newPassword: Yup.string().min(7, 'Must be at least 7 characters').max(255).required('Required'),
  oneTimeCode: Yup.string()
    .required('Required'),
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('username') || undefined;
  const { forgotPasswordSubmit } = useAuth<AuthContextType>();
  initialValues.email= username || initialValues.email
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {

        // await forgotPasswordSubmit(values.email, values.code, values.password);
        const response= await authApi.resetPassword(values.email, values.oneTimeCode, values.newPassword)
        if (isMounted()) {
          toast.success(response.message)
          const searchParams = new URLSearchParams({ username: values.email }).toString();
          const href = paths.auth.jwt.login+ `?${searchParams}`;
          router.push(href);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  usePageView();

  return (
    <>
      <Seo title="Reset Password" />
      <div>
        <Card elevation={16}>
          <CardHeader
            sx={{ pb: 0 }}
            title="Reset Password"
          />
          <CardContent>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
              {username ? (
                  <TextField
                    sx={{ color: 'dark' }}
                    disabled
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={username}
                  />
                ):(
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
                )}
                {/* <FormControl error={!!(formik.touched.code && formik.errors.code)}>
                  <FormLabel
                    sx={{
                      display: 'block',
                      mb: 2,
                    }}
                  >
                    Verification code
                  </FormLabel>
                  <MuiOtpInput
                    length={6}
                    onBlur={() => formik.handleBlur('code')}
                    onChange={(value) => formik.setFieldValue('code', value)}
                    onFocus={() => formik.setFieldTouched('code')}
                    sx={{
                      '& .MuiFilledInput-input': {
                        p: '14px',
                      },
                    }}
                    value={formik.values.code}
                  />
                  {!!(formik.touched.code && formik.errors.code) && (
                    <FormHelperText>{formik.errors.code}</FormHelperText>
                  )}
                </FormControl> */}
                <TextField
                  error={!!(formik.touched.newPassword && formik.errors.newPassword)}
                  fullWidth
                  helperText={formik.touched.newPassword && formik.errors.newPassword}
                  label="New Password"
                  name="newPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.newPassword}
                />
                <TextField
                  error={!!(formik.touched.oneTimeCode && formik.errors.oneTimeCode)}
                  fullWidth
                  helperText={formik.touched.oneTimeCode && formik.errors.oneTimeCode}
                  label="Code"
                  name="oneTimeCode"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.oneTimeCode}
                />
              </Stack>
              {formik.errors.submit && (
                <FormHelperText
                  error
                  sx={{ mt: 3 }}
                >
                  {formik.errors.submit as string}
                </FormHelperText>
              )}
              <Button
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Reset Password
              </Button>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 3,
                }}
              >
                <Link
                  component={RouterLink}
                  href={paths.auth.jwt.forgotPassword}
                  underline="hover"
                  variant="subtitle2"
                >
                  Did you not receive the code?
                </Link>
              </Box>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;

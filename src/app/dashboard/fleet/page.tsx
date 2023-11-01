'use client';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import type { AuthContextType } from 'src/contexts/auth/amplify';
import { useAuth } from 'src/hooks/use-auth';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import Grid from '@mui/material/Unstable_Grid2';
import { AuthIssuer } from 'src/sections/auth/auth-issuer';
import { Container } from '@mui/material';
import Textarea from '@mui/joy/Textarea';

interface Values {
  email: string;
  password: string;
  policy: boolean;
  submit: null;
}

const initialValues: Values = {
  email: '',
  password: '',
  policy: true,
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().min(7).max(255).required('Password is required'),
  policy: Yup.boolean().oneOf([true], 'This field must be checked'),
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const { issuer, signUp } = useAuth<AuthContextType>();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await signUp(values.email, values.password);

        if (isMounted()) {
          const searchParams = new URLSearchParams({ username: values.email }).toString();
          const href = paths.auth.amplify.confirmRegister + `?${searchParams}`;
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
    <form
      onSubmit={formik.handleSubmit}

    >
      <Card>
        <CardHeader title="Fleet Creation" titleTypographyProps={{ textAlign: "center" }}  spacing={0}
           direction="column"
           alignItems="center"
           justify="center" />
        <CardContent sx={{ pt: 5 }}>
          <Grid
           container
           spacing={0}
           direction="column"
           alignItems="center"
           justify="center"
          //  style={{ minHeight: '100vh' }}
          >
            <Grid
              xs={12}
              md={4}
            >
              <TextField
                // error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                sx={{ mb:2 }}
                // helperText={formik.touched.name && formik.errors.name}
                label="Fleet Name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                // value={formik.values.name}
              />
               <TextField
               sx={{ mb:2 }}
                // error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                // helperText={formik.touched.name && formik.errors.name}
                label="Company"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // value={formik.values.name}
              />
               <TextField
               sx={{ mb:2 }}
                // error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                // helperText={formik.touched.name && formik.errors.name}
                label="Description"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // required
                // value={formik.values.name}
              />

            </Grid>

          </Grid>
        </CardContent>
        <Stack
           spacing={0}
           direction="column"
           alignItems="center"
           justify="center"
          sx={{ pb: 3, pl:3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
           Done
          </Button>
          {/* <Button
            color="inherit"
            component={RouterLink}
            disabled={formik.isSubmitting}
            href={paths.dashboard.customers.details}
          >
            Cancel
          </Button> */}
        </Stack>
      </Card>
    </form>
    </>
  );
};

export default Page;

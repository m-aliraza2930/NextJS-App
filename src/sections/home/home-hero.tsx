import type { FC } from 'react';
import EyeIcon from '@untitled-ui/icons-react/build/esm/Eye';
import LayoutBottomIcon from '@untitled-ui/icons-react/build/esm/LayoutBottom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';

import { HomeCodeSamples } from './home-code-samples';
import Page from 'src/app/auth/jwt/login/page';
import { Layout } from 'src/layouts/auth/modern-layout';

export const HomeHero: FC = () => {
  const theme = useTheme();

  return (
    <>
     {/* <Box
    //   sx={{
    //     backgroundRepeat: 'no-repeat',
    //     backgroundPosition: 'top center',
    //     backgroundImage: 'url("/assets/gradient-bg.svg")',
    //     pt: '120px',
    //   }}
    // > */}
      <Layout />
       {/* <Container maxWidth="sm">
         <Page />
       </Container> */}
    {/* // </Box> */}
    </>
  );
};

import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
//import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Outlet } from 'react-router-dom';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { PageContainer } from '@toolpad/core/PageContainer';
// import Grid from '@mui/material/Grid2';
//import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
//importamos las páginas
// import About from './pages/About';
// import Contact from './pages/Contact';
// //import Dashboard from './pages/Dashboard';
// import Layout from './layout/Layout';





const NAVIGATION = [
  {
    kind: 'header',
    title: 'Módulos',
  },
  {
    segment: 'about',
    title: 'About por decir nomás',
    icon: <ShoppingCartIcon />
  },
  {
    segment: 'contact',
    title: 'Contact, también por decir nomás'
  }
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);


  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashBoard() {

  //const router = useDemoRouter('/dashboard');


  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      branding={{
        logo: <img src = "https://res.cloudinary.com/deaubfnet/image/upload/v1729643153/avatars/avatar-1729643153468.jpg"/>,
        title: "Generador de exámenes"
      }}
    >
        {/** TODO: Por acá debemos poner el contenido del panel 2 de justinmind y este componete iría en el App.jsx
         * por ahora sirve para construir todos los componentes e irlos probando uno a uno.
         */}
         <Outlet/>
    </AppProvider>
  );
}

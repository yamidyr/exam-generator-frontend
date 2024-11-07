import { extendTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Outlet } from 'react-router-dom';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountBoxIcon from '@mui/icons-material/AccountBox';



const NAVIGATION = [
  {
    kind: 'header',
    title: 'Módulos',
  },
  {
    segment: 'dashboard/preguntas',
    title: 'Módulo de preguntas',
    icon: <LiveHelpIcon />
  },
  {
    segment: 'dashboard/examenes',
    title: 'Módulo de exámenes',
    icon: <QuizIcon />
  },
  {
    segment: 'dashboard/perfil',
    title: 'Mi cuenta',
    icon: <AccountBoxIcon />
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

export default function DashBoard() {
  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      branding={{
        logo: <img src = "https://res.cloudinary.com/deaubfnet/image/upload/v1729643153/avatars/avatar-1729643153468.jpg"/>,
        title: "Generador de exámenes"
      }}
    >
      <Outlet/>
    </AppProvider>
  );
}

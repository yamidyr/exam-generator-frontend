import { extendTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Outlet } from 'react-router-dom';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { DashboardLayout, PageContainer } from '@toolpad/core'



const NAVIGATION = [
  {
    kind: 'header',
    title: 'Módulos',
  },
  {
    segment: 'dashboard/preguntas',
    title: 'Módulo de preguntas',
    icon: <LiveHelpIcon />,
    children: [
      {
      segment: 'listar-preguntas',
      title: 'Preguntas creadas'
      },
      {
        segment: 'crear-pregunta',
        title: 'Crear pregunta'
      }
    ]
  },
  {
    segment: 'dashboard/examenes',
    title: 'Módulo de exámenes',
    icon: <QuizIcon />,
    children: [
      {
      segment: 'listar-examenes',
      title: 'Examenes generados'
      },
      {
        segment: 'generar-examen',
        title: 'Generar examen'
      }
    ]
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
      <DashboardLayout>
        <PageContainer>
          <Outlet/>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

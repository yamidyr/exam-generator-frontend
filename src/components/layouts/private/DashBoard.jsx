import { AppProvider } from '@toolpad/core/AppProvider';
import { Outlet } from 'react-router-dom';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { DashboardLayout, PageContainer } from '@toolpad/core'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useEffect, useMemo, useState } from 'react';




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



export default function DashBoard() {

  // Navegación:
const navigate = useNavigate();

// Usamos el hook Auth para tener disponible el objeto del usuario identificado.
const { auth } = useAuth();

console.log("useauth: " , auth);
const [session, setSession] = useState({});

useEffect(() => {
  setSession({
    user: {
      name: auth.name,
      email: auth.role
    },
  });
},[]);

const authentication = useMemo(() => {
  return {
    signIn: () => {
      setSession({
        user: {
          name: auth.name,
          email: auth.role
        },
      });
    },
    signOut: () => {
      setSession(null);
      // Vaciar el local storage
      localStorage.clear();

      // Setear estados globales a vacío
      //auth({}); TODO: Revisar el cierre de sesión

      // Navigate (redirección) al login
      navigate("/");
    }
  };
}, []);

  return (
    <AppProvider
      session = {session}
      authentication = {authentication}
      navigation={NAVIGATION}
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

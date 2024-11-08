import { createBrowserRouter, RouterProvider } from "react-router-dom"
import DashBoard from "../components/layouts/private/DashBoard";
import { ExamsModule } from "../components/layouts/private/examsModule/ExamsModule";
import { ProfileModule } from "../components/layouts/private/profileModule/ProfileModule";
import { Login } from "../components/layouts/public/Login";
import { Home } from "../components/layouts/private/Home";
import { QuestionsFilter } from "../components/layouts/private/questionsModule/QuestionsFilter";
import { CreateQuestion } from "../components/layouts/private/questionsModule/CreateQuestion";

const router = createBrowserRouter([
    {
      path: '/dashboard',
      Component: DashBoard,
      children:[
        {
          path: '',
          Component: Home,
        },
        {
          path: 'preguntas',
          Component: QuestionsFilter
        },
        {
          path: 'preguntas/listar-preguntas',
          Component: QuestionsFilter
        },
        {
          path: 'preguntas/crear-pregunta',
          Component: CreateQuestion
        },
        {
          path: 'examenes',
          Component: ExamsModule,
        },
        {
          path: 'perfil',
          Component: ProfileModule
        }
      ]
    },
    {
      path: '/login',
      Component: Login
    }
  ]);

export const Routing = () => {
  return (
    <RouterProvider router = {router}/>
  )
}

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import DashBoard from "../components/layouts/private/DashBoard";
import { ProfileModule } from "../components/layouts/private/profileModule/ProfileModule";
import { Home } from "../components/layouts/private/Home";
import { QuestionsFilter } from "../components/layouts/private/questionsModule/QuestionsFilter";
import { CreateQuestion } from "../components/layouts/private/questionsModule/CreateQuestion";
import { ExamsFilter } from "../components/layouts/private/examsModule/ExamsFilter";
import { GenerateExam } from "../components/layouts/private/examsModule/GenerateExam";
import { Login } from "../components/layouts/public/Login";
import SignUp from "../components/layouts/public/SignUp";

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
          path: 'examenes/listar-examenes',
          Component: ExamsFilter,
        },
        {
          path: 'examenes/generar-examen',
          Component: GenerateExam,
        },
        {
          path: 'perfil',
          Component: ProfileModule
        }
      ]
    },
    {
      path: '/',
      Component: Login
    },
    {
      path: '/sign-up',
      Component: SignUp
    }
  ]);

export const Routing = () => {
  return (
    <RouterProvider router = {router}/>
  )
}

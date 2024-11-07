import { createBrowserRouter, RouterProvider } from "react-router-dom"
import DashBoard from "../components/layouts/private/DashBoard";
import Layout from "../components/layouts/private/Layout";
import { QuestionsModule } from "../components/layouts/private/questionsModule/QuestionsModule";
import { ExamsModule } from "../components/layouts/private/examsModule/ExamsModule";
import { ProfileModule } from "../components/layouts/private/profileModule/ProfileModule";
import { Login } from "../components/layouts/public/Login";

const router = createBrowserRouter([
    {
      path: '/dashboard',
      Component: DashBoard,
      children:[
        {
          path: '/dashboard',
          Component: Layout,
          children:[
            {
              path: '/dashboard/preguntas',
              Component: QuestionsModule,
            },
            {
              path: '/dashboard/examenes',
              Component: ExamsModule,
            },
            {
              path: '/dashboard/perfil',
              Component: ProfileModule
            }
          ]
        }
      ]
    },
    {
      path: '/',
      Component: Login,
      children:[{
        path:'/login',
        Component: Login
      }]
    }
  ]);

export const Routing = () => {
  return (
    <RouterProvider router = {router}/>
  )
}

import { DashboardLayout } from '@toolpad/core'
import { Outlet } from 'react-router-dom'


export default function Layout() {
  return (
    <DashboardLayout>
        {/** TODO: Por acá debemos poner el contenido del panel 2 de justinmind y este componete iría en el App.jsx
         * por ahora sirve para construir todos los componentes e irlos probando uno a uno.
         */}

          <Outlet/>

      </DashboardLayout>
  )
}

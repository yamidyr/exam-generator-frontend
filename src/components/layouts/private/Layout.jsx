import { DashboardLayout, PageContainer } from '@toolpad/core'
import { Outlet } from 'react-router-dom'


export default function Layout() {
  return (
    <DashboardLayout>
      <PageContainer>
        <Outlet/>
      </PageContainer>
    </DashboardLayout>
  )
}

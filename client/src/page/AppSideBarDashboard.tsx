import AppHeader from '@/components/AppHeader'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AppSideBarDashboard() {
  return (
    <SidebarProvider>
        <div className='w-full p-5 bg-background text-foreground'>
            <Toaster />
            <AppHeader />
            <Outlet />
        </div>
    </SidebarProvider>
  )
}

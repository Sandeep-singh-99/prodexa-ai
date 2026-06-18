import SideBar from '@/components/SideBar'
import { Toaster } from '@/components/ui/sonner'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <div className="flex">
        <SideBar />
        <div className="flex-1">
          <Toaster />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

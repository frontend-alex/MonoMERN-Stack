import { Navigate, Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
     <>{false ? <Navigate to="/dashboard" /> : <Outlet />}</>
  )
}

export default RootLayout

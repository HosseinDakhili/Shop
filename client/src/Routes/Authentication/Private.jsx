import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


export default function Private() {
    const {token} = useSelector(state=>state.auth)
    if(!token) return <Navigate to='/auth' />

  return (
    <>
      <Outlet />
    </>
  )
}

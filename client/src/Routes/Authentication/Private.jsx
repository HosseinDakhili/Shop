import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


export default function Private() {
    const {jwt} = useSelector(state=>state.auth)
    console.log(jwt)
    if(!jwt) return <Navigate to='/auth' />

  return (
    <>
      <Outlet />
    </>
  )
}

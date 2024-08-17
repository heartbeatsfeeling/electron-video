import { Outlet } from 'react-router-dom'
export default function Layout () {
  return (
    <div>
      <header></header>
      <div>
        <div className="lnb">lnb</div>
        <div content='content'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

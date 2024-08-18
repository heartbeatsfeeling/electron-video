import { Outlet } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
export default function Layout () {
  return (
    <Fragment>
      <header></header>
      <div className='wrapper'>
        <div className="lnb">lnb</div>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </Fragment>
  )
}

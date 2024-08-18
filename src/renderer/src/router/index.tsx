import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout'

const router: any = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <span>test</span>
    },
    {
      path: 'cut',
      element: <span>test</span>
    },
    {
      path: 'ma',
      element: <span>test</span>
    }
  ]
}])
export default router

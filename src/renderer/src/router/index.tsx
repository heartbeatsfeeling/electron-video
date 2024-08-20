import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout'
import Cut from '../view/cut'

const router: any = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Cut />
    },
    {
      path: 'text',
      element: <span>test</span>
    },
    {
      path: 'ma',
      element: <span>test</span>
    }
  ]
}])
export default router

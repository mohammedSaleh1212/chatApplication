
import { createBrowserRouter } from 'react-router-dom'
import Layout from './screens/Layout'
import ErrorPage from './screens/Error'
import CreateUser from './screens/CreateUser'
import Login from './screens/Login'
import HomePage from './screens/HomePage'
import AuthChecker from './components/AuthChecker'
import Conversation from './components/Conversation'


const router = createBrowserRouter([

    {
        path: '/chatApplication/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [

            { path: 'signup', element: <CreateUser /> },
            { path: 'conversation/:id/:name', element: <Conversation /> },

            { path: '', element: <Login /> },
            { path: 'home', element: <AuthChecker><HomePage /></AuthChecker> },




        ]
    }



])



export default router


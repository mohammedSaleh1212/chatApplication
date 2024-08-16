import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../AuthStore';
import '../styles/login.css'

const Login = () => {
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useAuthStore(s => s.login)
    // const isLoggedIn = useAuthStore(s=>s.isLoggedIn)


    const onLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsLoading(true)

     try{

      await   login({  email, password })
     setIsLoading(false)    
     navigate('/chatApplication/home')
     
     }  
     catch(error) {
         console.log('login failed ' ,error)

     } 

    }

    return (


        <div className="d-flex justify-content-center align-items-center px-2" style={{height:'100dvh'}}>
            <div className='login-container form-container'>
                <h1 className='text-center mb-4'>chat App</h1>


                <form className='login-form d-grid'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control input" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control input" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type="submit" className="btn btn--primary mb-3 " onClick={onLogin}>
                        {isLoading && <div className="spinner-border me-2" style={{height:'1rem',width:'1rem', fontSize:'.5rem'}} role="status"></div>}
                        <span>
                        Login

                        </span>

                        </button>
                    <div className='no-wrap'>
                        <span className='me-2'>

                            do not have an account
                        </span>

                        <Link to={'/chatApplication/signup'}>create one</Link>


                    </div>
                </form>
            </div>
        </div>


    )
}

export default Login
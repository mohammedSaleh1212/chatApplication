import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../AuthStore';
const CreateUser = () => {
    const signUp = useAuthStore(s => s.signUp)
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');



    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        signUp({ email: email, password: password }, name, 'photourl')


        navigate('/chatApplication')


    }





    return (
        <div className="d-flex justify-content-center align-items-center px-2" style={{ height: '100dvh' }}>


            <div className='signup-container form-container'>
                <h1 className='text-center mb-4'>chat App</h1>


                <form className='signup-form d-grid' onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                        <input type="email" className="form-control input" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control input" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className=" mb-3">
                    <label htmlFor="full-name" className="form-label">Full Name</label>
                    <input type="text" className="form-control input" id="full-name" onChange={(e) => setName(e.target.value)} />

                    </div>

                    <button type="submit" className="btn btn--primary mb-3">Sign up</button>
                    <div className='no-wrap'>
                        <span className='me-2'>

                            already have an account
                        </span>

                        <Link to={'/chatApplication/'}>login</Link>


                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateUser
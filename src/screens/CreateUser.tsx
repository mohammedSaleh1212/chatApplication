import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../AuthStore';
const CreateUser = () => {
    const signUp = useAuthStore(s => s.signUp)
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
         signUp({ email: email, password: password },name,'photourlfuck')
        navigate('/')


    }





return (
    <main >
        <section>
            <div>
                <div>
                    <h1> FocusApp </h1>
                    <form onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Email address"
                            />
                        </div>

                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <label htmlFor="name">
                                name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="name"
                            />
                        </div>

                        <button
                            type="submit"
                          
                        >
                            Sign up
                        </button>

                    </form>

                    <p>
                        Already have an account?{' '}
                        <NavLink to="/chatApplication" >
                            Sign in
                        </NavLink>
                    </p>
                </div>
            </div>
        </section>
    </main>
)
}

export default CreateUser
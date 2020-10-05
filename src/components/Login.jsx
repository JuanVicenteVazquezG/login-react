import React from 'react';
import { auth, db } from '../config/firebase';
import { withRouter } from 'react-router-dom';

const Login = (props) => {

    const [email, setEMail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [error, setError] = React.useState(null);
    const [isRegistration, setIsRegistration] = React.useState(true);

    const processData = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            console.log();
            setError('Introduce a valid email');
            return;
        }
        if (!pass.trim()) {
            setError('Introduce a  valid password');
            return;
        }
        if (pass.length < 6) {
            setError('The password needs a minimum of 6 characters');
            return;
        }
        setError(null);
        if (isRegistration) {
            signUp();
        }
        else {
            login();
        }

    };

    const signUp = React.useCallback(async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass);
            console.log(res.user);
            await db.collection('users').doc('res.user.email').set({
                email: res.user.email,
                uid: res.user.uid
            });

            setEMail('');
            setPass('');
            setError(null);
            props.history.push('/admin');
        }
        catch (err) {
            setError(err.message);
        }
    }, [email, pass, props.history]);

    const login = React.useCallback(async () => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass);
            console.log(res.user);
            setEMail('');
            setPass('');
            setError(null);
            props.history.push('/admin');
        }
        catch (err) {
            setError(err.message);
        }
    }, [email, pass, props.history]);

    return (
        <div className="mt-5">
            <h3 className="text-center">{
                isRegistration ? 'Sign Up' : 'Sign In'
            }</h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={processData}>
                        {
                            error && (<div className="alert alert-danger">{error}</div>)
                        }
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Introduce an email"
                            onChange={e => setEMail(e.target.value)}
                            value={email}
                        />
                        <input
                            type="password"
                            className="form-control  mb-2"
                            placeholder="Introduce a valid password"
                            onChange={e => setPass(e.target.value)}
                            value={pass}
                        />
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                            {
                                isRegistration ? 'Sign up' : 'Log in'

                            }
                        </button>
                        <button
                            className="btn btn-info btn-sm btn-block"
                            onClick={() => { setIsRegistration(!isRegistration) }}>
                            {
                                isRegistration ? 'Are you Registered?' : 'Do you have an account?'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login);

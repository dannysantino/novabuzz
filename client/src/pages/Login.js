import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'

import { useForm } from '../utilities/hooks'

const Login = () => {
    let navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(logUser, {
        username: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            navigate('/');
        },
        onError(e) {
            setErrors(e.graphQLErrors[0].extensions.errors)
        },
        variables: values
    });

    function logUser() {
        loginUser();
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>Login</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(e => (
                            <li key={e}>{e}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
                username: $username password: $password
        ) {
            id
            username
            email
            createdAt
            token
        }
    }
`

export default Login

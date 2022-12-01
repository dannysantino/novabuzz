import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

import { useForm } from '../utilities/hooks'
import { AuthContext } from '../context/auth'

const Login = () => {
    let navigate = useNavigate();

    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(logUser, {
        username: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
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
        <Grid style={{ height: 'calc(100vh - 66px)' }} verticalAlign='middle' centered>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Log in to your account
                </Header>
                <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                    <Segment>
                        <Form.Input
                            label='Username'
                            name='username'
                            type='text'
                            value={values.username}
                            error={errors.username ? true : false}
                            onChange={onChange}
                            icon='user'
                            iconPosition='left'
                            fluid
                        />
                        <Form.Input
                            label='Password'
                            name='password'
                            type='password'
                            value={values.password}
                            error={errors.password ? true : false}
                            onChange={onChange}
                            icon='lock'
                            iconPosition='left'
                            fluid
                        />
                        <Button type='submit' primary fluid>Login</Button>
                    </Segment>

                </Form>
                {Object.keys(errors).length > 0 && (
                    <div className='ui error message'>
                        <ul className='list'>
                            {Object.values(errors).map(e => (
                                <li key={e}>{e}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </Grid.Column>
        </Grid>
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

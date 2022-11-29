import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

import { useForm } from '../utilities/hooks'
import { AuthContext } from '../context/auth'

const Register = () => {
    let navigate = useNavigate();

    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            navigate('/');
        },
        onError(e) {
            setErrors(e.graphQLErrors[0].extensions.errors)
        },
        variables: values
    });

    function registerUser() {
        addUser();
    }

    return (
        <Grid style={{ height: 'calc(100vh - 66px)' }} verticalAlign='middle' centered>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Sign up for a new account
                </Header>
                <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                    <Segment>
                        <Form.Input
                            label="Username"
                            name="username"
                            type="text"
                            value={values.username}
                            error={errors.username ? true : false}
                            onChange={onChange}
                            icon='user'
                            iconPosition='left'
                            fluid
                        />
                        <Form.Input
                            label="Email"
                            name="email"
                            type="email"
                            value={values.email}
                            error={errors.email ? true : false}
                            onChange={onChange}
                            icon='mail'
                            iconPosition='left'
                            fluid
                        />
                        <Form.Input
                            label="Password"
                            name="password"
                            type="password"
                            value={values.password}
                            error={errors.password ? true : false}
                            onChange={onChange}
                            icon='lock'
                            iconPosition='left'
                            fluid
                        />
                        <Form.Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={values.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            onChange={onChange}
                            icon='lock'
                            iconPosition='left'
                            fluid
                        />
                        <Button type="submit" primary fluid>Register</Button>
                    </Segment>
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
            </Grid.Column>
        </Grid>
    );
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            username
            email
            createdAt
            token
        }
    }
`

export default Register

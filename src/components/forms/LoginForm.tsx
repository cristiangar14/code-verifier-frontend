import React from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { login } from '../../services/authServices';
import { AxiosResponse } from 'axios';

// Define Schema of validation with yup

const loginSchema = Yup.object().shape(
    {
        email: Yup.string().email('Invalid Email Format').required('Email is required'),
        password: Yup.string().required('Password is required')
    }
)

//Login Component
const LoginForm = () => {

    // We define the initial credentials
    const initialCredentials = {
        email: '',
        password: '',
    }


  return (
    <div>
        <h4>Login Form</h4>
        {/*  Formik to encapsulate a form */}
        <Formik 
            initialValues={initialCredentials}
            validationSchema={loginSchema}
            onSubmit={  async(values) => {
                login(values.email, values.password).then((response: AxiosResponse) => {
                    
                    if (response.status === 200) {
                        if (response.data.token) {
                            sessionStorage.setItem('sessionJWTToken', response.data.token); 
                        } else {
                            throw new Error('Invalid token');
                        }

                    } else {
                        throw new Error('Invalid crendetials');
                    }



                }).catch((error) => console.error(`[LOGIN ERROR]: something went wrong: ${error}`))
            }}
        >
            {
                ({values, touched, errors, isSubmitting, handleChange, handleBlur}) => 
                    (
                        <Form>
                            {/* Email */}
                            <label htmlFor='email'>Email</label>
                            <Field id='email' type='email' name='email' placeholder='example@email.com' />
                            {/*  Email Erros */}
                            {
                                errors.email && touched.email && (
                                    <ErrorMessage name='email' component='div'></ErrorMessage>    
                                )
                            }

                            {/* Password */}
                            <label htmlFor='password'>Email</label>
                            <Field id='password' type='password' name='password' placeholder='Password' />
                            {/*  Password Erros */}
                            {
                                errors.password && touched.password && (
                                    <ErrorMessage name='password' component='div'></ErrorMessage>    
                                )
                            }

                            {/* Submit Form */}
                            <button type='submit'>Login</button>
                            {/*  Message is the form is submitting */}
                            {
                                isSubmitting 
                                    ? (<p>Checking crendetials...</p>)
                                    : null
                            }
                        </Form>
                    )
            }

        </Formik>
    </div>
  )
}

export default LoginForm
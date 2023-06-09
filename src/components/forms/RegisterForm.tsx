import React from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { register } from '../../services/authServices';
import { AxiosResponse } from 'axios';

// Define Schema of validation with yup

const registerSchema = Yup.object().shape(
    {
        name: Yup.string()
            .min(3,'Username must have three letters minimum')
            .max(12,'Username contain a maximum of 12 characters')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid Email Format')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password too short')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')],'The password does not match')
            .required('You must confirm your password'),
        age: Yup.number()
            .min(10, 'You must be over 10 years old')
            .positive('age must be a positive value')
            .integer('age must be an integer value')
            .required('Age is required'),
    }
)


const RegisterForm = () => {

    // We define the initial object
    const initialRegister = {
        name:'',
        email: '',
        password: '',
        confirmPassword:'',
        age:1
    }


  return (
    <div>
        <h4>Register as a new User</h4>
        {/*  Formik to encapsulate a form */}
        <Formik 
            initialValues={initialRegister}
            validationSchema={registerSchema}
            onSubmit={  async(values) => {
                const {name, email, password, age} = values;
                register(name, email, password, age).then((response: AxiosResponse) => {
                    if (response.status === 200) {
                        console.log(response.data)
                    } else {
                        throw new Error('Error in registry');
                    }
                }).catch((error) => console.error(`[REGISTER ERROR]: something went wrong: ${error}`))
            }}
        >
            {
                ({values, touched, errors, isSubmitting, handleChange, handleBlur}) => 
                    (
                        <Form>
                            {/* Name */}
                            <label htmlFor='name'>name</label>
                            <Field id='name' type='text' name='name' placeholder='Your Name' />
                            {/*  Name Erros */}
                            {
                                errors.name && touched.name && (
                                    <ErrorMessage name='name' component='div'></ErrorMessage>    
                                )
                            }
                            {/* Email */}
                            <label htmlFor='email'>email</label>
                            <Field id='email' type='email' name='email' placeholder='example@email.com' />
                            {/*  Email Erros */}
                            {
                                errors.email && touched.email && (
                                    <ErrorMessage name='email' component='div'></ErrorMessage>    
                                )
                            }

                            {/* Password */}
                            <label htmlFor='password'>Password</label>
                            <Field id='password' type='password' name='password' placeholder='Password' />
                            {/*  Password Erros */}
                            {
                                errors.password && touched.password && (
                                    <ErrorMessage name='password' component='div'></ErrorMessage>    
                                )
                            }

                            {/* confirmPassword */}
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <Field id='confirmPassword' type='password' name='confirmPassword' placeholder='Confirm your Password' />
                            {/*  confirmPassword Erros */}
                            {
                                errors.confirmPassword && touched.confirmPassword && (
                                    <ErrorMessage name='confirmPassword' component='div'></ErrorMessage>    
                                )
                            }

                            {/* Age */}
                            <label htmlFor='age'>Age</label>
                            <Field id='age' type='numer' name='age' placeholder='age' />
                            {/*  Password Erros */}
                            {
                                errors.age && touched.age && (
                                    <ErrorMessage name='age' component='div'></ErrorMessage>    
                                )
                            }


                            {/* Submit Form */}
                            <button type='submit'>Register</button>
                            {/*  Message is the form is submitting */}
                            {
                                isSubmitting 
                                    ? (<p>Sending data to registry...</p>)
                                    : null
                            }
                        </Form>
                    )
            }

        </Formik>
    </div>
  )
}

export default RegisterForm
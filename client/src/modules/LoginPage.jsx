import { Link, useNavigate } from "react-router-dom"
import { usePageError } from "../hooks/usePageError";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { Field, Form, Formik } from "formik";

import cn from "classnames";

const validateEmail = (value) => {
    if (!value) {
        return 'Email is required';
    }

    const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

    if (!emailPattern.test(value)) {
    return "Email is not valid";
  }
};

const validatePassword = (value) => {
    if (!value) {
        return 'Password is required';
    }

    if (value.length < 6) {
        return 'At least 6 characters'
    }
}

export const LoginPage = () => {
    const navigate = useNavigate('');

    const [error, setError] = usePageError('');
    const { login } = useContext(AuthContext);

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validateOnMount={true}
                onSubmit={({ email, password }) => {
                  return login({ email, password })
                      .then(() => {
                          navigate('/profile');
                      })
                      .catch((error) => {
                          const msg = error.response?.data?.message;
                          if (msg === "Please check your inbox and activate your email") {
                              setError("Ви маєте активувати акаунт через посилання у листі, надісланому на вашу пошту.");
                          } else {
                              setError(msg || "Сталася помилка під час входу.");
                          }
                      })
              }}
            >
                {({ touched, errors, isSubmitting, values }) => (
                    <Form className="box">
                        <h1 className="title">Log in</h1>
                        <div className="field">
                            <label htmlFor="email" className="label">
                                Email
                            </label>

                            <div className="control has-icons-left has-icons-right">
                                <Field
                                    validate={validateEmail}
                                    name='email'
                                    type='email'
                                    id='email'
                                    placeholder='name@gmail.com'
                                    className={cn('input', {
                                        'is-danger': touched.email && errors.email
                                    })}
                                />

                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i>
                                </span>

                                {touched.email && errors.email && (
                                    <span className="icon is-small is-right has-text-danger">
                                        <i className="fas fa-exclamation-triangle"></i>
                                    </span>
                                )}
                            </div>

                            {touched.email && errors.email && (
                                <p className="help is-danger">{errors.email}</p>
                            )}
                        </div>

                        <div className="field">
                            <label htmlFor="password" className="label">
                                Password
                            </label>

                            <div className="control has-icons-left has-icons-right">
                                <Field
                                    validate={validatePassword}
                                    name='password'
                                    type='password'
                                    id='password'
                                    placeholder='********'
                                    className={cn('input', {
                                        'is-danger': touched.password && errors.password
                                    })}
                                />

                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i>
                                </span>

                                {touched.password && errors.password && (
                                    <span className="icon is-small is-right has-text-danger">
                                        <i className="fas fa-exclamation-triangle"></i>
                                    </span>
                                )}
                            </div>

                            {touched.password && errors.password ? (
                                <p className="help is-danger">{errors.password}</p>
                            ) : (
                                <p className="help">At least 6 characters</p>
                            )}
                        </div>

                        <div className="field field__btn">
                            <button
                                type="submit"
                                className={cn("button is-success has-text-weight-bold", {
                                    "is-loading": isSubmitting,
                                })}
                                disabled={isSubmitting || errors.email || errors.password}
                            >
                                Log in
                            </button>
                            Forgot your password?{" "}
                            <Link state={{ email: values.email }} to='/reset'>Reset</Link>
                        </div>
                    </Form>
                )}
            </Formik>

            {error && <p className="notification is-danger is-light">{error}</p>}
        </>
    )
}

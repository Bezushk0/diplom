import { useContext, useState } from "react";
import { usePageError } from "../hooks/usePageError"
import { AuthContext } from "./AuthContext";
import { Field, Form, Formik } from "formik";

import cn from 'classnames';

const validatePassword = (value) => {
  if (!value) {
    return "Password is required";
  }

  if (value.length < 6) {
    return "At least 6 characters";
  }
};

const validateEmail = (value) => {
    if (!value) {
        return 'Email is required';
    }

    const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

    if (!emailPattern.test(value)) {
    return "Email is not valid";
  }
};

export const ChangeEmailConfirmation = () => {
    const [error, setError] = usePageError('');
    const [done, setDone] = useState(false);
    const { user, changeEmailAuth } = useContext(AuthContext);

    const handleSubmit = (values, user, formikHelpers) => {
        const { id, name } = user;
        const { password, email, newEmail } = values;

        if (newEmail !== email) {
            setError('Emails are not equal');
            formikHelpers.setSubmitting(false);
            return;
        }

        return changeEmailAuth({ id, name, email, password }, formikHelpers)
            .then(() => {
                setDone(true);
            })
            .catch((err) => {
                setError(err.response?.data?.message);
                formikHelpers.setSubmitting(false);
            });
    };

    return (
        <>
            {!done ? (
                <Formik
                    initialValues={{
                        password: "",
                        email: "",
                        newEmail: "",
                    }}
                    validateOnMount={true}
                    onSubmit={(values, formikHelpers) => {
                        handleSubmit(values, user, formikHelpers);
                    }}
                >
                    {({ touched, errors, isSubmitting }) => (
                        <Form className="box">
                            <h1 className="title">Change email</h1>

                            <div className="formik__wrapper">
                                <div className="formik-column__half">
                                    <label htmlFor="password" className="label">
                                        Please type your current password
                                    </label>

                                    <div className="control has-icons-left has-icons-right">
                                        <Field
                                            name='password'
                                            validate={validatePassword}
                                            type='password'
                                            id='password'
                                            placeholder='*******'
                                            className={cn("input", {
                                                "is-danger": touched.password && errors.password,
                                            })}
                                        />

                                        <span className="icon is-small is-left">
                                            <i className="fa fa-lock"></i>
                                        </span>

                                        {touched.password && errors.password && (
                                            <span className="icon is-small is-right has-text-danger">
                                                <i className="fas fa-exclamation-triangle"></i>
                                            </span>
                                        )}
                                    </div>

                                    {touched.password && errors.password && (
                                        <p className="help is-danger">{errors.password}</p>
                                    )}
                                </div>
                            </div>

                            <div className="formik__wrapper">
                                <div className="formik-column__half">
                                    <label htmlFor="email" className="label">
                                        New email
                                    </label>

                                    <div className="control has-icons-left has-icons-right">
                                        <Field
                                            name='email'
                                            validate={validateEmail}
                                            type='email'
                                            id='email'
                                            placegolder='Please type the new email'
                                            className={cn("input", {
                                                "is-danger": touched.email && errors.email,
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
                            </div>

                            <div className="formik__wrapper">
                                <div className="formik-column__half">
                                    <label htmlFor="newEmail" className="label">
                                        Confirm new email
                                    </label>

                                    <div className="control has-icons-left has-icons-right">
                                        <Field
                                            name='newEmail'
                                            validate={validateEmail}
                                            type='email'
                                            id='newEmail'
                                            placegolder='Please confirm the new email'
                                            className={cn("input", {
                                                "is-danger": touched.newEmail && errors.newEmail,
                                            })}
                                        />

                                        <span className="icon is-small is-left">
                                            <i className="fa fa-envelope"></i>
                                        </span>

                                        {touched.newEmail && errors.newEmail && (
                                            <span className="icon is-small is-right has-text-danger">
                                                <i className="fas fa-exclamation-triangle"></i>
                                            </span>
                                        )}
                                    </div>

                                    {touched.newEmail && errors.newEmail && (
                                        <p className="help is-danger">{errors.newEmail}</p>
                                    )}
                                </div>
                            </div>

                            <div className="field mt-3">
                                <button
                                    type="submit"
                                    className={cn('button is-success has-text-weight-bold formik__submit',
                                        {
                                            'is-loading': isSubmitting,
                                        }
                                    )}
                                    disabled={
                                        isSubmitting ||
                                        errors.password ||
                                        errors.email ||
                                        errors.newEmail
                                    }
                                >
                                    Change email
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : (
                <p className="notification is-success is-light">
                    Your email is successfully changed!   
                </p>
            )}

            {error && <p className="notification is-danger is-light">{error}</p>}
        </>
    )
}
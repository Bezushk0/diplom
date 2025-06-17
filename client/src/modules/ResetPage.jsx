import { useLocation } from "react-router-dom";
import { usePageError } from "../hooks/usePageError";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { authService } from "../services/authService";

import cn from 'classnames'

const validateEmail = (value) => {
    if (!value) {
        return 'Email is required';
    }

    const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

    if (!emailPattern.test(value)) {
    return "Email is not valid";
  }
};

export const ResetPage = () => {
    const [error, setError] = usePageError('');
    const location = useLocation();
    const [visibleForm, setVisibleForm] = useState(true);
    
    const initialEmail = location.state?.email || '';

    return (
        <>
            {visibleForm ? (
                <Formik
                    initialValues={{
                        email: initialEmail,
                    }}
                    validateOnMount={true}
                    onSubmit={({ email }, formikHelpers) => {
                        authService
                            .reset({ email })
                            .then(() => setVisibleForm(false))
                            .catch((error) => {
                                if (error.message) {
                                    setError(error.message);
                                }

                                if (!error.response?.data) {
                                    return;
                                }

                                const { errors, message } = error.response.data;

                                formikHelpers.setFieldError("email", errors?.email);

                                if (message) {
                                    setError(message);
                                }
                            })
                            .finally(() => {
                                formikHelpers.setSubmitting(false);
                            })
                    }}
                >
                    {({ touched, errors, isSubmitting }) => (
                        <Form className="box">
                            <h1 className="title">Reset password</h1>

                            <div className="field">
                                <label htmlFor="email" className="label">
                                    Email
                                </label>

                                <div className="control has-icons-left has-icons-right">
                                    <Field
                                        validate={validateEmail}
                                        name="email"
                                        type="email"
                                        id="email"
                                        placeholder="vasya@gmail.com"
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

                            <div className="field">
                                <button
                                    type="submit"
                                    className={cn("button is-success has-text-weight-bold", {
                                        "is-loading": isSubmitting,
                                    })}
                                    disabled={isSubmitting || errors.email}
                                >
                                    Reset password
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : (
                <h1>
                    Hi, we have sent a password reset email to you. Please check your
                    inbox!
                </h1>
            )}

            {error && <p className="notification is-danger is-light">{error}</p>}
        </>
    )
}
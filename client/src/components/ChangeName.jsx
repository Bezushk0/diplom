import { useContext, useState } from "react"
import { AuthContext } from "./AuthContext"
import { Field, Form, Formik } from "formik";

import cn from "classnames";

export const ChangeName = () => {
    const { user, change } = useContext(AuthContext);
    const { name, email } = user;
    const [done, setDone] = useState(false);

    const handleChangeName = (user) => {
        setDone(true);
        return change(user);
    }

    const validateName = (value) => {
        if (!value.trim()) {
            return "Name is required";
        }
    };

    return (
        <>
            <div className="personalInformation box personalInformation__wrapper">
                <p>
                    Your name is: <b>{name}</b>
                </p>
                <p>
                    Your email is: <b>{email}</b>{" "}
                </p>
            </div>

            {!done ? (
                <div className="personalBox box">
                    <div className="personalInfo">
                        <Formik
                            initialValues={{
                                name: '',
                            }}
                            validateOnMount={true}
                            onSubmit={(values) =>
                                handleChangeName({ ...user, name: values.name })
                            }
                        >
                            {({touched, errors, isSubmitting}) => (
                                <Form>
                                    <h1 className="title">Change name</h1>
                                    <label htmlFor="name" className="label">
                                        Name
                                    </label>

                                    <div className="control has-icons-left has-icons-right">
                                        <Field
                                            validate={validateName}
                                            name="name"
                                            type="text"
                                            id="name"
                                            placeholder="Name"
                                            className={cn("input", {
                                                "is-danger": touched.name && errors.name,
                                            })}
                                        />

                                        <span className="icon is-small is-left">
                                            <i className="fa fa-user"></i>
                                        </span>

                                        {touched.name && errors.name && (
                                            <span className="icon is-small is-right has-text-danger">
                                                <i className="fas fa-exclamation-triangle"></i>
                                            </span>
                                        )}
                                    </div>

                                    {touched.name && errors.name && (
                                        <p className="help is-danger">{errors.name}</p>
                                    )}

                                    <div className="field mt-3">
                                        <button
                                            type="submit"
                                            className={cn(
                                                "button is-success has-text-weight-bold formik__submit",
                                                {
                                                "is-loading": isSubmitting,
                                                }
                                            )}
                                            disabled={isSubmitting || errors.name}
                                        >
                                            Change name
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            ) : (
                <p className="notification is-success is-light">
                    Your name is successfully changed!
                </p>
            )}
        </>
    )
}

export default ChangeName;
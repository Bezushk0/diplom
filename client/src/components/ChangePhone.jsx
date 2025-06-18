import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Field, Form, Formik } from "formik";

const validatePhone = (value) => {
  if (!value) return "Phone is required";
  const phonePattern = /^\+?[0-9]{10,15}$/;
  if (!phonePattern.test(value)) return "Phone number is not valid";
};

export const ChangePhone = () => {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const { user, updateUserPhone } = useContext(AuthContext);

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      if (!user) throw new Error("User not authenticated");

      const { phone, confirmPhone } = values;

      if (phone !== confirmPhone) throw new Error("Phone numbers do not match");

      // Логіка оновлення телефону (асинхронна)
      const updatedUser = await updateUserPhone(phone);

      if (!updatedUser || !updatedUser.phone) {
        throw new Error("Phone update failed");
      }

      setDone(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <p className="notification is-success is-light">
        Your phone number is successfully changed!
      </p>
    );
  }

  return (
    <>
      <Formik
        initialValues={{ phone: "", confirmPhone: "" }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};
          const phoneError = validatePhone(values.phone);
          const confirmError = validatePhone(values.confirmPhone);
          if (phoneError) errors.phone = phoneError;
          if (confirmError) errors.confirmPhone = confirmError;
          if (!errors.phone && !errors.confirmPhone && values.phone !== values.confirmPhone) {
            errors.confirmPhone = "Phone numbers do not match";
          }
          return errors;
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="box">
            <h1 className="title">Change phone</h1>

            <label htmlFor="phone" className="label">
              New phone number
            </label>
            <Field
              id="phone"
              name="phone"
              placeholder="+380XXXXXXXXX"
              className={errors.phone && touched.phone ? "input is-danger" : "input"}
            />
            {errors.phone && touched.phone && <p className="help is-danger">{errors.phone}</p>}

            <label htmlFor="confirmPhone" className="label" style={{ marginTop: 20 }}>
              Confirm new phone number
            </label>
            <Field
              id="confirmPhone"
              name="confirmPhone"
              placeholder="+380XXXXXXXXX"
              className={errors.confirmPhone && touched.confirmPhone ? "input is-danger" : "input"}
            />
            {errors.confirmPhone && touched.confirmPhone && (
              <p className="help is-danger">{errors.confirmPhone}</p>
            )}

            <button
              type="submit"
              className="button is-success mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Changing..." : "Change phone"}
            </button>

            {error && <p className="notification is-danger is-light mt-3">{error}</p>}
          </Form>
        )}
      </Formik>
    </>
  );
};

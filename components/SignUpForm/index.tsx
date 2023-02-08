import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./SignUpForm.module.css";

interface FormValues {
  firstName: string;
  email: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const SignUpForm: React.FC = () => {
  return (
    <Formik
      initialValues={{ firstName: "", email: "" }}
      validationSchema={validationSchema}
      onSubmit={(
        values: FormValues,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
      ) => {
        setTimeout(() => {
          console.log("Form values: ", values);
          setSubmitting(false);
        }, 1000);
      }}
    >
      {({ isSubmitting }: { isSubmitting: boolean }) => (
        <Form className={styles.form}>
          <div className={styles.formHeader}>
            Join our mailing list to receive a daily email with all of our top
            stories.
          </div>
          <div className={styles.formGroup}>
            <Field
              type="text"
              id="first-name"
              name="firstName"
              placeHolder="First name..."
              className={styles.formControl}
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className={styles.errorMessage}
            />
          </div>
          <div className={styles.formGroup}>
            <Field
              type="email"
              id="email"
              name="email"
              placeHolder="Enter your Email"
              className={styles.formControl}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errorMessage}
            />
          </div>
          <div className={styles.formFooter}>
            By signing up you agree to our <a href="#">Terms of Use</a> and{" "}
            <a href="#">Privacy Policy</a>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.button}
          >
            KEEP ME ON THE LOOP
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;

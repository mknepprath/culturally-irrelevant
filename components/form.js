import classnames from "classnames";
import { Formik } from "formik";

import Button from "../components/button";

import styles from "./form.module.css";

export default function Form({ isDarkMode }) {
  const [successMessage, setSuccessMessage] = React.useState("");

  return (
    <Formik
      initialValues={{
        name: "",
        recommendation: "",
        year: "",
        medium: "",
        message: "",
      }}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        fetch("api/recommendation", {
          method: "POST",
          body: JSON.stringify(values),
        }).then(() => {
          resetForm();
          setSubmitting(false);
          setSuccessMessage(
            `Thank you for your submission! It will be reviewed shortly.`
          );
        });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          className={classnames(styles.form, { [styles.dark]: isDarkMode })}
          onSubmit={handleSubmit}
        >
          <label className={styles.label} htmlFor="recommendation">
            Recommendation
          </label>
          <input
            className={styles.input}
            maxLength="48"
            id="recommendation"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.recommendation}
          />
          {errors.recommendation &&
            touched.recommendation &&
            errors.recommendation}

          <label className={styles.label} htmlFor="year">
            Year
          </label>
          <input
            className={styles.input}
            maxLength="16"
            id="year"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.year}
          />
          {errors.year && touched.year && errors.year}

          <label className={styles.label} htmlFor="medium">
            Medium
          </label>
          <input
            className={styles.input}
            maxLength="32"
            id="medium"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Film, Book, Series..."
            value={values.medium}
          />
          {errors.medium && touched.medium && errors.medium}

          <label className={styles.label} htmlFor="name">
            Your Name
          </label>
          <input
            className={styles.input}
            maxLength="32"
            id="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.name && touched.name && errors.name}

          <label className={styles.label} htmlFor="message">
            Message
          </label>
          <textarea
            className={styles.textarea}
            maxLength="140"
            id="message"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.message}
          />
          {errors.message && touched.message && errors.message}

          <Button disabled={isSubmitting} isDarkMode={isDarkMode} type="submit">
            Submit
          </Button>
          <p>{successMessage}</p>
        </form>
      )}
    </Formik>
  );
}

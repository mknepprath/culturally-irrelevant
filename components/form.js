import { Formik } from "formik";

export default function Form() {
  const [successMessage, setSuccessMessage] = React.useState("");

  return (
    <>
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <label htmlFor="recommendation">Recommendation</label>
            <input
              maxLength="48"
              name="recommendation"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.recommendation}
            />
            {errors.recommendation &&
              touched.recommendation &&
              errors.recommendation}

            <label htmlFor="year">Year</label>
            <input
              maxLength="16"
              name="year"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.year}
            />
            {errors.year && touched.year && errors.year}

            <label htmlFor="medium">Medium</label>
            <input
              maxLength="32"
              name="medium"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Film, Book, Series..."
              value={values.medium}
            />
            {errors.medium && touched.medium && errors.medium}

            <label htmlFor="name">Your Name</label>
            <input
              maxLength="32"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}

            <label htmlFor="message">Message</label>
            <textarea
              maxLength="140"
              name="message"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
            />
            {errors.message && touched.message && errors.message}

            <button className="button" disabled={isSubmitting} type="submit">
              Submit
            </button>
            <p>{successMessage}</p>
          </form>
        )}
      </Formik>

      <style jsx>{`
        .button {
          background-color: #ffffff;
          border: 4px solid #000000;
          border-radius: 10px;
          box-shadow: 8px 8px 0 rgba(0, 0, 0, 1);
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          padding: 0.75rem;
          transition: 0.15s ease;
        }
        .button:hover,
        .button:focus,
        .button:active {
          background-color: #ffe234;
          box-shadow: 16px 16px 0 rgba(0, 0, 0, 1);
          transform: translate(0, -2px);
        }

        form {
          width: 100%;
        }

        label,
        input,
        textarea {
          display: block;
        }

        label {
          margin-bottom: 4px;
        }

        input,
        textarea {
          border: 4px solid #000000;
          border-radius: 10px;
          box-sizing: border-box;
          padding: 8px;
          font-size: 1rem;
          width: 100%;
          max-width: 100%;
          margin-bottom: 16px;
        }

        h2 {
          margin-top: 0;
        }
      `}</style>
    </>
  );
}

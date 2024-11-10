import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./BookForm.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookForm = () => {
  const initialValues = {
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    toast.success("Form submitted successfully!");
    resetForm();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    bookingDate: Yup.date().required("Booking date is required"),
    comment: Yup.string(),
  });

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>Book your campervan now</h2>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, touched, errors }) => (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <Field
                name="name"
                placeholder="Name*"
                className={`${css.formControl} ${
                  touched.name && errors.name ? css.isInvalid : ""
                }`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={css.errorMessage}
              />
            </div>
            <div className={css.formGroup}>
              <Field
                name="email"
                type="email"
                placeholder="Email*"
                className={`${css.formControl} ${
                  touched.email && errors.email ? css.isInvalid : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.errorMessage}
              />
            </div>
            <div className={css.formGroup}>
              <div className={css.datePickerWrapper}>
                <DatePicker
                  selected={values.bookingDate}
                  onChange={(date) => setFieldValue("bookingDate", date)}
                  placeholderText="Booking date*"
                  className={css.datePickerInput}
                  dateFormat="MMMM d, yyyy"
                  calendarClassName={css.calendar}
                />
              </div>
              <ErrorMessage
                name="bookingDate"
                component="div"
                className={css.errorMessage}
              />
            </div>
            <div className={css.formGroup}>
              <Field
                as="textarea"
                name="comment"
                placeholder="Comment"
                className={css.formControlComment}
              />
            </div>
            <button type="submit" className={css.submitButton}>
              Send
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default BookForm;

// components/forms/AddInstructorForm.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const AddInstructorForm = ({ onClose }) => {
  const initialValues = {
    name: "",
    email: "",
    expertise: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    expertise: Yup.string().required("Expertise is required"),
  });

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    console.log("Form submitted:", values);
    setTimeout(() => {
      resetForm();
      setSubmitting(false);
      onClose(); // Will call onClose after submit
    }, 500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Add New Instructor</h2>
        <p className="text-sm text-gray-500 mt-2">Fill in the details carefully</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Field
                id="name"
                name="name"
                className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                  errors.name && touched.name ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="John Doe"
              />
              <ErrorMessage name="name" component="div" className="mt-1 text-xs text-red-500" />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                  errors.email && touched.email ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="john@example.com"
              />
              <ErrorMessage name="email" component="div" className="mt-1 text-xs text-red-500" />
            </div>

            {/* Expertise Field */}
            <div>
              <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">
                Area of Expertise
              </label>
              <Field
                id="expertise"
                name="expertise"
                as="select"
                className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                  errors.expertise && touched.expertise ? "border-red-400" : "border-gray-300"
                }`}
              >
                <option value="">Select an expertise</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage name="expertise" component="div" className="mt-1 text-xs text-red-500" />
            </div>

            {/* Buttons */}
            <div className="flex justify-end items-center gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Adding...
                  </div>
                ) : (
                  "Add Instructor"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Card from "components/card";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  // Validation schemas for each step
  const step1Validation = Yup.object({
    name: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
  });

  const step2Validation = Yup.object({
    phone: Yup.string().required("Phone is required"),
    altPhone: Yup.string().required("Alternative Phone is required"),
  });

  const step3Validation = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    location: Yup.string().required("Location is required"),
    dob: Yup.date().required("Date of Birth is required"),
  });

  // Handle submission
  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 text-navy-700 dark:text-white md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
        <div className="w-full max-w-lg">
          <Formik
            initialValues={{
              name: "",
              about: "",
              phone: "",
              altPhone: "",
              email: "",
              location: "",
              dob: "",
              coverImage: null,
              profileImage: null,
            }}
            validationSchema={
              step === 1
                ? step1Validation
                : step === 2
                ? step2Validation
                : step3Validation
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ setFieldValue }) => (
              <Form>
                {step === 1 && (
                  <div>
                    <h2 className="mb-4 text-xl">Step 1: Personal Details</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">Name</label>
                      <Field
                        name="name"
                        type="text"
                        className="w-full rounded-md border px-3 py-2"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">About</label>
                      <Field
                        name="about"
                        as="textarea"
                        className="w-full rounded-md border px-3 py-2"
                      />
                      <ErrorMessage
                        name="about"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="rounded-md bg-blue-500 px-4 py-2 text-white"
                    >
                      Next
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="mb-4 text-xl">Step 2: Contact Details</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">Phone</label>
                      <Field
                        name="phone"
                        type="text"
                        className="w-full rounded-md border px-3 py-2"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Alternative Phone
                      </label>
                      <Field
                        name="altPhone"
                        type="text"
                        className="w-full rounded-md border px-3 py-2"
                      />
                      <ErrorMessage
                        name="altPhone"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={prevStep}
                      className="rounded-md bg-gray-500 px-4 py-2 text-white"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="rounded-md bg-blue-500 px-4 py-2 text-white"
                    >
                      Next
                    </button>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="mb-4 text-xl">Step 3: Other Information</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">Email</label>
                      <Field
                        name="email"
                        type="email"
                        className="w-full rounded-md border px-3 py-2"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Location
                      </label>
                      <Field
                        name="location"
                        type="text"
                        className="w-full rounded-md border px-3 py-2"
                      />
                      <ErrorMessage
                        name="location"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Date of Birth
                      </label>
                      <Field
                        name="dob"
                        type="date"
                        className="w-full rounded-md border px-3 py-2"
                      />
                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Cover Image
                      </label>
                      <input
                        type="file"
                        name="coverImage"
                        onChange={(event) =>
                          setFieldValue("coverImage", event.target.files[0])
                        }
                        className="w-full rounded-md border px-3 py-2"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Profile Image
                      </label>
                      <input
                        type="file"
                        name="profileImage"
                        onChange={(event) =>
                          setFieldValue("profileImage", event.target.files[0])
                        }
                        className="w-full rounded-md border px-3 py-2"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={prevStep}
                      className="rounded-md bg-gray-500 px-4 py-2 text-white"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-green-500 px-4 py-2 text-white"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Card>
  );
};

export default MultiStepForm;

import React, { useContext, useState, useEffect } from "react"
import { Formik, ErrorMessage, Form, Field } from "formik"
import axios from "axios"

import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider"

import Layout from "../components/layout"
import ImageUpload from "../components/imageUpload"

const BecomeAModel = () => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)

  const [mobileNum, setMobileNum] = useState("")
  const [countryCode, setCountryCode] = useState("")
  let isMobile
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 480
  }

  useEffect(() => {
    const setPath = () => {
      localStorage.removeItem("ave-ticker")
      const tickerText =
        typeof window !== "undefined" ? window.location.pathname : ""
      dispatch({ type: "SET_PATH", payload: tickerText })
    }
    setPath()
  }, [])

  const handleMobileChange = e => {
    if (e.target.value.length > 17) return
    setMobileNum(e.target.value)
  }

  const handleCountryCodeChange = e => {
    if (e.target.value.length > 4) return
    setCountryCode(e.target.value)
  }

  return (
    <Layout className="margin-bottom--50">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          mobileNumber: "",
          address: "",
          height: "",
          age: "",
          gender: "",
          instagram: "",
          email: "",
        }}
        validate={values => {
          const errors = {}
          if (!values.email) {
            errors.email = "Required"
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address"
          }
          if (!values.firstName) {
            errors.firstName = "Required"
          }
          if (!values.lastName) {
            errors.lastName = "Required"
          }
          if (!values.dateOfBirth) {
            errors.dateOfBirth = "Required"
          }
          if (!mobileNum) {
            errors.mobileNumber = "Required"
          }
          if (!values.address) {
            errors.address = "Required"
          }
          if (!values.height) {
            errors.height = "Required"
          }
          if (!values.age) {
            errors.age = "Required"
          }
          if (!values.gender) {
            errors.gender = "Required"
          }
          if (!values.instagram) {
            errors.instagram = "Required"
          }
          return errors
        }}
        setFieldValue={("mobileNumber", handleMobileChange)}
        onSubmit={(values, { setSubmitting }) => {
          const bodyFormData = new FormData()
          bodyFormData.set("firstName", values.firstName)
          bodyFormData.set("lastName", values.lastName)
          bodyFormData.set("email", values.email)
          bodyFormData.set("dateOfBirth", values.dateOfBirth)
          bodyFormData.set("mobileNumber", `${countryCode} ${mobileNum}`)
          bodyFormData.set("address", values.address)
          bodyFormData.set("height", values.height)
          bodyFormData.set("age", values.age)
          bodyFormData.set("gender", values.gender)
          bodyFormData.set("instagram", values.instagram)
          bodyFormData.set("headShot", state.headShot)
          bodyFormData.set("profile", state.profile)
          bodyFormData.set("midLength", state.midLength)
          bodyFormData.set("fullLength", state.fullLength)
          setTimeout(() => {
            axios.post(
              "http://avemanagement1.eu/wp-json/contact-form-7/v1/contact-forms/16319/feedback",
              bodyFormData
            )
            setSubmitting(false)
          }, 400)
        }}
      >
        {({
          values,
          xx,
          handleChange,
          handleBlur,
          /* and other goodies */
        }) => (
          <div className="flex content-padding">
            <Form
              id="become-a-model"
              className="flex flex-column contact-form width-100"
            >
              <div className="flex justify-between relative">
                <label className="contact-label" htmlFor="firstname">
                  First Name
                </label>
                <Field
                  className="contact-input"
                  type="input"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                <ErrorMessage
                  className="contact-error"
                  name="firstName"
                  component="div"
                />
              </div>
              <div className="flex justify-between relative">
                <label className="contact-label" htmlFor="lastName">
                  Surname
                </label>
                <Field
                  className="contact-input"
                  type="input"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.subject}
                />
                <ErrorMessage
                  className="contact-error"
                  name="lastName"
                  component="div"
                />
              </div>
              <div className="flex justify-between relative">
                <label className="contact-label" htmlFor="dateOfBirth">
                  Date of Birth
                </label>
                <div className="flex contact--width-650">
                  <input
                    className="contact-input contact-input--day"
                    type="text"
                    name="dateOfBirth"
                    placeholder="DD"
                    maxLength={2}
                    pattern="^[0-9]*$"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dateOfBirth.day}
                  />
                  <input
                    className="contact-input contact-input--day"
                    type="text"
                    name="dateOfBirth"
                    placeholder="MM"
                    maxLength={2}
                    pattern="^[0-9]*$"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dateOfBirth.month}
                  />
                  <input
                    className="contact-input contact-input--year"
                    type="text"
                    name="dateOfBirth"
                    placeholder="YYYY"
                    maxLength={4}
                    pattern="^[0-9]*$"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dateOfBirth.year}
                  />
                </div>
                <ErrorMessage
                  className="contact-error"
                  name="dateOfBirth"
                  component="div"
                />
              </div>
              <div className="flex relative justify-between">
                <label className="contact-label" htmlFor="mobileNumber">
                  Mobile
                </label>
                <div className="flex width-100 contact--width-650">
                  <input
                    className="contact-input contact-input--country-code"
                    type="input"
                    name="mobileNumber"
                    placeholder="+00"
                    onChange={e => handleCountryCodeChange(e)}
                    onBlur={handleBlur}
                    value={countryCode}
                  />
                  <input
                    className="contact-input contact-input--mobile"
                    type="input"
                    name="mobileNumber"
                    placeholder="00000000"
                    onChange={e => handleMobileChange(e)}
                    onBlur={handleBlur}
                    value={mobileNum}
                  />
                  <ErrorMessage
                    className="contact-error"
                    name="mobileNumber"
                    component="div"
                  />
                </div>
              </div>
              <div className="flex justify-between relative">
                <label className="contact-label" htmlFor="address">
                  Address
                </label>
                <Field
                  className="contact-input"
                  type="input"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                />
                <ErrorMessage
                  className="contact-error"
                  name="address"
                  component="div"
                />
              </div>
              <div className="flex justify-between relative">
                <label className="contact-label" htmlFor="height">
                  Height
                </label>
                <Field
                  className="contact-input"
                  type="input"
                  name="height"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.height}
                />
                <ErrorMessage
                  className="contact-error"
                  name="height"
                  component="div"
                />
              </div>
              <div className="flex justify-between relative">
                <label className="contact-label" htmlFor="age">
                  Age
                </label>
                <Field
                  className="contact-input"
                  type="input"
                  name="age"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.age}
                />
                <ErrorMessage
                  className="contact-error"
                  name="age"
                  component="div"
                />
              </div>
              <div className="flex justify-between relative">
                <label className="contact-label" htmlFor="gender">
                  Gender
                </label>
                <Field
                  className="contact-input"
                  type="input"
                  name="gender"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.gender}
                />
                <ErrorMessage
                  className="contact-error"
                  name="gender"
                  component="div"
                />
              </div>
              <div className="flex relative justify-between">
                <label className="contact-label" htmlFor="instagram">
                  Instagram
                </label>
                <Field
                  className="contact-input"
                  type="input"
                  name="instagram"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.instagram}
                />
                <ErrorMessage
                  className="contact-error"
                  name="instagram"
                  component="div"
                />
              </div>
              <div className="flex relative justify-between">
                <label className="contact-label" htmlFor="email">
                  Email
                </label>
                <Field
                  className="contact-input"
                  type="input"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <ErrorMessage
                  className="contact-error"
                  name="email"
                  component="div"
                />
              </div>
              <button
                name="submit-form"
                id="submit-form"
                form="become-a-model"
                type="submit"
                style={{ marginTop: 10, visibility: "hidden" }}
              >
                Submit
              </button>
            </Form>
          </div>
        )}
      </Formik>
      <div className="flex flex-column contact-body-text content-padding">
        <h4 className="upload-photographs underline">Upload photographs</h4>
        <p>
          Submit only natural photographs, no professional studio shots are
          required, as we wish to see you in your most natural state.
        </p>
        <p>
          please submit 4 photographs of yourself, Head-shot, profile,
          mid-length & full-length. All photographs must be in color.
        </p>
        <p>Do not submit digitally enhanced photographs.</p>
        <p>
          please do not wear make-up, as we must see your true skin complexion.
        </p>
        <p>
          the head-shot must be taken front-on and should fully show your face.
          please relax your face, do not smile or pout in the photographs, as
          this is like a passport photograph to document your look for us.
        </p>
        <p>
          keep hair natural as possible, and it must not obstruct your face and
          bone structure in the head-shot.
        </p>
        <p>
          in the profile shot, we need to see the jawline. hair needs to be kept
          away from the face.
        </p>
        <p>
          the mid-length and full-length shots should be taken whilst fully
          clothed. avoid wearing baggy clothes and stand up straight with your
          shoulders back. try to look as natural as possible.
        </p>
      </div>
      <div className="flex flex-column">
        <span className="content-padding">
          <h4 className="upload-photographs" style={{ marginBottom: -17 }}>
            ENSURE YOUR IMAGES ARE NOT
          </h4>
          <br />{" "}
          <h4
            className="upload-photographs underline"
            style={{
              position: "relative",
              top: -2,
            }}
          >
            LARGER THAN 2MB EACH IN SIZE
          </h4>
        </span>
        <div className="flex flex-wrap content-padding category-cards relative">
          <ImageUpload
            isMobile={isMobile}
            order={0}
            title="headShot"
            text="HEAD SHOT"
          />
          <ImageUpload
            isMobile={isMobile}
            order={1}
            title="profile"
            text="PROFILE"
          />
          <ImageUpload
            isMobile={isMobile}
            order={2}
            title="midLength"
            text="MID LENGTH"
          />
          <ImageUpload
            isMobile={isMobile}
            order={3}
            title="fullLength"
            text="FULL LENGTH"
          />
        </div>
      </div>

      <div className="contact-form-submit">
        <label className="contact-form-submit-label bold" htmlFor="submit-form">
          Submit
        </label>
      </div>
    </Layout>
  )
}

export default BecomeAModel

import React, { useState } from 'react'
import { useFormik } from 'formik'
import { validate } from '../schemas'

const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    selectCity: "",
    gender: "",
    hobby: false,
    image: "",
    password: "",
    c_password: ""
}

function MyFormikForm() {
    const { values, errors, handleChange, handleSubmit, touched, setValues, setErrors } = useFormik({
        initialValues: initialValues,
        validationSchema: validate,
        onSubmit: (values, action) => {
            action.resetForm()
        }
    })
    const dropOption = [
        { label: "Gandhinagar", value: 1 },
        { label: "Surat", value: 2 },
        { label: "Vapi", value: 3 },
    ];
    const checkBoxList = [
        { labelCheck: "Cricket", valueCheck: 1 },
        { labelCheck: "Football", valueCheck: 2 },
    ];
    const [uploadeImage, setUploadeImage] = useState("")
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setUploadeImage(reader.result);
        }; if (file) {
            reader.readAsDataURL(file);
        } else {
            setUploadeImage("");
        }
    };
    const handleReset = () => {
        setValues(initialValues);
        setErrors({});
        setUploadeImage("");
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Registration Form</h1>
                {/* Name */}
                <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-2 col-form-label">
                        Name
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter your name"
                            id="name"
                            // required // --- if we use "required" in <input>,<select> or <textarea> then it will validated by browser,so to add custome validation we use no validate in <form>
                            onChange={handleChange}
                            value={values.name}
                        />
                        {errors.name && touched.name ? <p>{errors.name}</p> : null}
                    </div>
                </div>

                {/* Email */}
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            id="email"
                            // required
                            onChange={handleChange}
                            value={values.email}
                        />
                        {errors.email && touched.email ? <p>{errors.email}</p> : null}
                    </div>
                </div>

                {/* Mobile Number */}
                <div className="row mb-3">
                    <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">
                        Mobile Number
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            placeholder="Enter your Phone Number"
                            id="phoneNumber"
                            // required
                            onChange={handleChange}
                            value={values.phoneNumber}
                            maxLength={10}
                        />
                    </div>
                    {errors.phoneNumber && touched.phoneNumber ? <p>{errors.phoneNumber}</p> : null}
                </div>

                {/* Selection */}
                <div className="row mb-3">
                    <label
                        className="col-form-label col-sm-2 pt-0"
                        htmlFor="selectCity"
                    >
                        City
                    </label>
                    <div className="col-sm-2">
                        <select
                            className="form-select"
                            id="selectCity"
                            name="selectCity"
                            // required
                            onChange={handleChange}
                            value={values.selectCity}
                        >
                            <option value="" disabled>Select Your City</option>
                            {dropOption.map((option) => (
                                <option key={option.value}>{option.label}</option>
                            ))}
                        </select>
                        {errors.selectCity && touched.selectCity ? <p>{errors.selectCity}</p> : null}
                    </div>
                </div>

                {/* radio button */}
                <fieldset className="row mb-3">
                    <label className="col-form-label col-sm-2 pt-0">Gender</label>
                    <div className="col-sm-1">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="radio"
                                // required
                                value="Male"
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="gridRadios1">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="radio"
                                value="Female"
                                // required
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="gridRadios2">
                                Female
                            </label>
                        </div>
                    </div>
                    {errors.gender && touched.gender ? <p>{errors.gender}</p> : null}
                </fieldset>

                {/* check box */}
                <div className="row mb-3">
                    <legend className="col-form-label col-sm-2 pt-0">Hobby</legend>
                    <div className="col-sm-1">
                        <div className="checkBoxList">
                            {checkBoxList.map((select) => (
                                <label className="form-check" key={select.valueCheck}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="hobby"
                                        id="checkbox"
                                        // required
                                        onChange={handleChange}
                                        value={values.checkbox}
                                    />
                                    {select.labelCheck}
                                </label>
                            ))}
                        </div>
                    </div>
                    {errors.hobby && touched.hobby ? <p>{errors.hobby}</p> : null}
                </div>

                {/* file upload */}
                <div className="mb-3">
                    <input
                        type="file"
                        name="image"
                        id="image"
                        className="form-control"
                        aria-label="file example"
                        style={{ width: 450, marginLeft: 68 }}
                        // required
                        onChange={(event) => {
                            handleChange(event);
                            handleImageChange(event);
                        }}
                    />
                    {values.image && (
                        <div>
                            <img
                                src={uploadeImage ? uploadeImage : values.image}
                                alt="Uploaded"
                                style={{ width: 300, marginTop: 10 }}
                            />
                        </div>
                    )}
                    {errors.image && touched.image ? <p>{errors.image}</p> : null}
                </div>
                {/* password */}
                <div className="row mb-3">
                    <label htmlFor='inputPassword' className="col-sm-2 col-form-label">Password:</label>
                    <div className="col-sm-10">
                        <input type='text'
                            name='password'
                            placeholder='Enter your Password'
                            id="inputPassword"
                            style={{ width: 1043 }}
                            value={values.password}
                            onChange={handleChange} />
                    </div>
                    {errors.password && touched.password ? <p>{errors.password}</p> : null}
                </div>
                <br />

                {/* Confirm password */}
                <div className="row mb-3">
                    <label htmlFor='inputc_password' className="col-sm-2 col-form-label">Re-Enter Password:</label>
                    <div className="col-sm-10">
                        <input type='text'
                            name='c_password'
                            placeholder='Re-Enter your Password'
                            id="inputc_password"
                            style={{ width: 1043 }}
                            value={values.c_password}
                            onChange={handleChange} />
                    </div>
                    {errors.c_password && touched.c_password ? <p>{errors.c_password}</p> : null}
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-outline-success" style={{ width: 90, marginRight: 15, marginTop: 15, marginBottom: 20 }}>
                    Submit
                </button>

                {/* Reset button */}
                <button
                    type="reset"
                    className="btn btn-outline-primary"
                    style={{ width: 90, marginTop: 15, marginRight: 15, marginBottom: 20 }}
                    onClick={handleReset}
                >
                    Reset all
                </button>
            </form>
        </div>
    )
}

export default MyFormikForm
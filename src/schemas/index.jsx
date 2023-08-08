import * as Yup from 'yup';

export const validate = Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    email: Yup.string().email('Invalid email address.').required('Email is required.'),
    phoneNumber: Yup.string()
        .required('Mobile number is required.')
        .matches(/^\d+$/, 'Mobile number must contain only numbers.')
        .length(10, 'Mobile number must be 10 digits.'),
    selectCity: Yup.string().required('City is required.'),
    gender: Yup.string().required('Gender is required.'),
    hobby: Yup.boolean().oneOf([true], 'Please select a hobby.'),
    image: Yup.string()
        .test('fileType', 'Please upload an image.', (value) => {
            if (!value) return false;
            const acceptedFormats = ['jpg', 'jpeg', 'png', 'gif'];
            const fileExtension = value.split('.').pop().toLowerCase();
            return acceptedFormats.includes(fileExtension);
        })
        .required('Please upload an image.'),
    password: Yup.string().required('Password is required.'),
    c_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match.')
        .required('Confirm password is required.'),
});

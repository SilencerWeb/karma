import * as Yup from 'yup';

export const email = Yup.string()
  .email('A valid email is required')
  .required('Email is required');

export const password = Yup.string()
  .min(6, 'Password must be at least 6 characters')
  .max(128, 'Password cannot exceed 128 characters')
  .required('Password is required');

export const confirmPassword = Yup.string()
  .test(
    'match',
    'Passwords must match',
    (currentPassword) => {
      return currentPassword === this.options.parent.password;
    },
  )
  .required('Confirm password is required');

/* eslint-disable func-names */

import * as Yup from 'yup';

export const email = Yup.string()
  .email('A valid email is required');

export const password = Yup.string()
  .min(6, 'Password must be at least 6 characters')
  .max(128, 'Password cannot exceed 128 characters')
  .test(
    'match',
    'Passwords must match',
    function (password) {
      return this.options.parent.currentPassword ? password === this.options.parent.currentPassword : true;
    },
  );

export const confirmPassword = Yup.string()
  .test(
    'match',
    'Passwords must match',
    function (currentPassword) {
      return currentPassword === this.options.parent.password;
    },
  );

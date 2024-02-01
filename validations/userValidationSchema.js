const z = require('zod');
const { isValidEmailDomain } = require('../utils/dns');
const { findUserByEmail } = require('../models/model.users');

const nameSchema = z
  .string({
    required_error: 'Name is required',
  })
  .trim()
  .min(3, {
    message: 'Name must contain at least 3 character(s)',
  })
  .regex(/^[a-zA-Z\s]+$/, {
    message: 'Name must contain only alphabetic characters and spaces',
  })
  .max(130, {
    message: 'Name must contain at most 130 character(s)',
  });

const emailSchema = z
  .string()
  .trim()
  .min(1, {
    message: 'Email is required',
  })
  .email()
  .max(400, {
    message: 'Email must contain at most 130 character(s)',
  })
  .refine(
    async (email) => {
      const user = await findUserByEmail(email);
      return user.rowCount < 1;
    },
    {
      message: 'Email already exists',
    }
  )
  .refine(
    async (email) => {
      const validEmail = await isValidEmailDomain(email);
      return !validEmail;
    },
    {
      message: 'Domain of the email address is not valid',
    }
  );

const userValidationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
});

module.exports = { userValidationSchema, nameSchema, emailSchema };

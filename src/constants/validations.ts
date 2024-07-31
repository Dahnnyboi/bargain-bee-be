import { startCase, toLower } from "lodash";
import { Schema } from "express-validator";
import countries from "i18n-iso-countries";

// Error messages
const fieldRequiredMessage = (field: string) =>
  `${startCase(toLower(field))} is required`;

const invalidTypeMessage = (field: string, type: string) =>
  `${startCase(toLower(field))} must be type ${type}`;

const invalidEmailMessage = (field: string) =>
  `${startCase(toLower(field))} must be a valid email address`;

const invalidLengthMessage = (field: string, min: number, max: number) =>
  `${startCase(toLower(field))} length must be minimum of ${min} and maximum length of ${max}`;

// Custom validators
const countryValidator = (value: string) => {
  const isValidCountry = countries.isValid(value);

  if (!isValidCountry) {
    throw new Error("Must be a valid country");
  }

  return true;
};

const passwordValidator = (value: string) => {
  if (!/[A-Z]/.test(value))
    throw new Error("Password must include at least one uppercase letter.");

  if (!/[a-z]/.test(value))
    throw new Error("Password must include at least one lowercase letter.");

  if (!/\d/.test(value))
    throw new Error("Password must include at least one digit.");

  if (!/[@$!%*?&#]/.test(value))
    throw new Error("Password must include at least one special character.");

  return true;
};

// Schema validations

export const USER_VALIDATIONS: Schema = {
  first_name: {
    notEmpty: {
      errorMessage: fieldRequiredMessage("first_name"),
    },
    isString: {
      errorMessage: invalidTypeMessage("first_name", "string"),
    },
  },
  last_name: {
    notEmpty: {
      errorMessage: fieldRequiredMessage("last_name"),
    },
    isString: {
      errorMessage: invalidTypeMessage("last_name", "string"),
    },
  },
  email: {
    notEmpty: {
      errorMessage: fieldRequiredMessage("email"),
    },
    isString: {
      errorMessage: invalidTypeMessage("email", "string"),
    },
    isEmail: {
      errorMessage: invalidEmailMessage("email"),
    },
  },
  street: {
    notEmpty: {
      errorMessage: fieldRequiredMessage("street"),
    },
    isString: {
      errorMessage: invalidTypeMessage("street", "string"),
    },
  },
  city: {
    notEmpty: {
      errorMessage: fieldRequiredMessage("city"),
    },
    isString: {
      errorMessage: invalidTypeMessage("city", "string"),
    },
  },
  country: {
    custom: {
      options: countryValidator,
    },
    notEmpty: {
      errorMessage: fieldRequiredMessage("city"),
    },
    isString: {
      errorMessage: invalidTypeMessage("city", "string"),
    },
  },
  password: {
    notEmpty: {
      errorMessage: fieldRequiredMessage("password"),
    },
    isString: {
      errorMessage: invalidTypeMessage("password", "string"),
    },
    isLength: {
      options: {
        min: 8,
        max: 64,
      },
      errorMessage: invalidLengthMessage("password", 8, 64),
    },
    custom: {
      options: passwordValidator,
    },
  },
};

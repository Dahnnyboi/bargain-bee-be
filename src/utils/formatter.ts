export const errorFormatterResponse = (
  message: string,
  errors?: Record<string, string>[],
  additionals?: Record<string, null>
) => {
  return {
    message,
    errors,
    ...additionals,
  };
};

export const successActionFormatterResponse = (
  message?: string,
  data?: Record<
    string,
    string | number | string[] | number[] | Record<string, string>
  >
) => {
  return { message, data };
};

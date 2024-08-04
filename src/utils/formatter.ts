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

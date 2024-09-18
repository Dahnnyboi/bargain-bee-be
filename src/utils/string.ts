export const joinWithAnd = (arr: string[], separator = "and") => {
  if (arr.length === 0) return "";
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return arr.join(` ${separator} `);
  return `${arr.slice(0, -1).join(", ")}, ${separator} ${arr[arr.length - 1]}`;
};

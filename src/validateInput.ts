export const validateNameAndSpecies = (input: string) => {
  let result = input.trim().toLowerCase();
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return result;
};

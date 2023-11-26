export function formatNumber(number) {
  return parseFloat(number).toLocaleString();
}

export function parseFormattedNumber(inputValue) {
  if (typeof inputValue === "string") {
    
      // Remove non-numeric and non-decimal characters using a regular expression
      inputValue = inputValue.replace(/[^0-9.]/g, '');

      // Ensure only one decimal point
      const decimalCount = (inputValue.match(/\./g) || []).length;
      if (decimalCount > 1) {
        inputValue = inputValue.slice(0, -1); // Remove the last character if there's more than one decimal point
      }
    return Number(inputValue);
  } else return inputValue;
}

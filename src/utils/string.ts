export function toUpperCaseFirstLetter(val: string) {
  return val[0].toUpperCase() + val.substr(1, val.length - 1);
}

export function transformText(input) {
  const formattedText = input.toLowerCase().replace(/_/g, ' ');
  return formattedText.charAt(0).toUpperCase() + formattedText.slice(1);
}

export function formatPhoneNumber(phoneNumber) {
  if (phoneNumber?.startsWith('+234')) {
    return '0' + phoneNumber.slice(4);
  }
  return phoneNumber;
}

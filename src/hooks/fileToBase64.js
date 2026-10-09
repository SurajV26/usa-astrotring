/**
 * Convert a file to Base64 string
 * @param {File} file - The file to convert
 * @returns {Promise<string>} - Base64 string (with data URL prefix)
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
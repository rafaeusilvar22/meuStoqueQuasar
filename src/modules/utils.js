export const getRedirectObj = (redirectString) =>
  redirectString.split("&").reduce((acc, keyValuePair) => {
    const [key, value] = keyValuePair.split("=");
    acc[key] = value;
    return acc;
  }, {});

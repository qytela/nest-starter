import * as getConfig from 'src/config';

export const config = (key: string): any => {
  const keys = key.split('.');
  let result = getConfig;

  for (const k of keys) {
    if (result && result[k] !== undefined) {
      result = result[k];
    } else {
      result = null;
      break;
    }
  }

  return result;
};

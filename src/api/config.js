console.log('PRODUCTION', PRODUCTION);

export const url = {
  url1: PRODUCTION ? 'https://api.eastday.com/url1' : 'https://testapi.eastday.com/url1',
  url2: PRODUCTION ? 'https://api.eastday.com/url2' : 'https://testapi.eastday.com/url2'
};

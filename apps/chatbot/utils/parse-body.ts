import * as querystring from 'querystring';
export const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      let rawBody = '';

      req.on('data', (data) => {
        rawBody += data;
      });

      req.on('end', () => {
        resolve(querystring.decode(rawBody));
      });
    } else {
      return reject(new Error('Not a valid POST request'));
    }
  });
};

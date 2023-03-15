export const parseHost = (req) => {
  return req.protocol + '://' + req.get('host');
};

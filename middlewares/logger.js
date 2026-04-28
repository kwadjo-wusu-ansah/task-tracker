
export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const { method, path } = req;

  console.log(`[${timestamp}] ${method} request to: ${path}`);

  next();
};
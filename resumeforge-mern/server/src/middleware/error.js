import mongoose from 'mongoose';

export function notFound(req, res) {
  res.status(404).json({ message: `No API route for ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  let status = err.status || err.statusCode || 500;
  let message = err.message || 'Something went wrong.';

  if (err instanceof mongoose.Error.CastError) {
    status = 404;
    message = 'Not found.';
  } else if (err instanceof mongoose.Error.ValidationError) {
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(' ');
  } else if (err.code === 11000) {
    status = 409;
    message = 'An account with that email already exists.';
  } else if (err.type === 'entity.too.large') {
    status = 413;
    message = 'That request is too large.';
  } else if (err.type === 'entity.parse.failed') {
    status = 400;
    message = 'The request body is not valid JSON.';
  }

  if (status >= 500) {
    console.error(err);
    if (process.env.NODE_ENV === 'production') message = 'Something went wrong on our side.';
  }
  res.status(status).json({ message });
}

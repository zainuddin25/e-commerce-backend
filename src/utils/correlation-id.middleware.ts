import * as uuid from 'uuid';

export function CorrelationIdMiddleware() {
  return (req, res, next: () => void) => {
    const correlationHeader = req.headers['x-correlation-id'] || uuid.v4();

    // eslint-disable-next-line no-param-reassign
    req.headers['x-correlation-id'] = correlationHeader;
    res.header('X-Correlation-Id', correlationHeader);
    next();
  };
}

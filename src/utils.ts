import { addSeconds, isBefore } from 'date-fns';

function isExpired(objectDate, ttlInSeconds: number) {
  const maxAge = addSeconds(objectDate, ttlInSeconds);
  if (isBefore(objectDate, maxAge)) {
    this.logger.debug('data is still valid');

    return false;
  }

  return true;
}

export { isExpired };

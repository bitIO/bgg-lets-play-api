import { addSeconds, isBefore } from 'date-fns';

function isExpired(objectDate, ttlInSeconds: number) {
  const maxAge = addSeconds(objectDate, ttlInSeconds);
  if (isBefore(objectDate, maxAge)) {
    return false;
  }

  return true;
}

export { isExpired };

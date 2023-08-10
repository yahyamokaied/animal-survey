import {ErrorType} from './types';

export function getErrorMessage(error: ErrorType): string {
  if (typeof error === 'string') {
    return error;
  }

  if ('status' in error) {
    return `Error status: ${error.status}`;
  }

  if ('error' in error && typeof error.error === 'string') {
    return error.error;
  }

  if ('message' in error) {
    return error.message || 'An unknown error occurred';
  }

  return 'An unknown error occurred';
}

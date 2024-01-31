export type StatusInput = 'success' | 'error' | 'info' | undefined;
export const STATUS_INPUT = (statusInput?: StatusInput) => {
  let status = '';
  switch (statusInput) {
    case 'success':
      status = 'text-green-500';
      break;
    case 'error':
      status = 'text-red-500';
      break;
    default:
      status = 'text-gray-400';
      break;
  }
  return status;
};

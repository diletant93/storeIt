import { toastErrorType } from '@/types/types';
import { useToast } from './use-toast';

export default function useErrorToast() {
  const { toast } = useToast();
  function toastError({ messageJSX, message }: toastErrorType) {
    if (messageJSX) {
      return toast({
        description: (messageJSX),
        className: 'error-toast'
      })
    }

    if (message) {
      return toast({
        description: (<p className='body-2 text-white'>{message}</p>),
        className: 'error-toast'
      })
    }
    return toast({
      description: 'Something went wrong',
      className: 'error-toast'
    })
  }
  return { toastError }
}

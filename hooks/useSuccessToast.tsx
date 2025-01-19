import { toastErrorType } from '@/types/types';
import { useToast } from './use-toast';

export default function useSuccessToast() {
  const { toast } = useToast();
  function toastSuccess({ messageJSX, message }: toastErrorType) {
    if (messageJSX) {
      return toast({
        description: (messageJSX),
        className: 'success-toast'
      })
    }

    if (message) {
      return toast({
        description: (<p className='body-2 text-white'>{message}</p>),
        className: 'success-toast'
      })
    }
    return toast({
      description: 'Done',
      className: 'success-toast'
    })
  }
  return { toastSuccess }
}

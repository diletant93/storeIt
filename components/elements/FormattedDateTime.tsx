import { cn, formatDateTime } from "@/lib/utils";
import { FormattedDateTimeProps } from "@/types/props";

export default function FormattedDateTime({date,className=''}:FormattedDateTimeProps) {
  return (
    <p className={cn('body-1 text-light-200', className)}>
        {formatDateTime(date)}
    </p>
  );
}

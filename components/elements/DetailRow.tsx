import { DetailRowProps } from "@/types/props";

export default function DetailRow({label, value}: DetailRowProps) {
  return (
    <div className="flex items-center">
       <p className="file-details-label">{label}</p>
       <p className="file-details-value">{value}</p>
    </div>
  );
}

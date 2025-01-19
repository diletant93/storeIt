import Image from "next/image";

export default function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2">
       <Image src='/assets/icons/loader-brand.svg' height={50} width={50} alt="loader"/>
    </div>
  );
}

import Image from "next/image";

export default function UploadingFilePreview({ fileName }: { fileName: string }) {
    return (
        <div className='preview-item-name'>
            <p>
                {fileName}
            </p>
            <Image src='/assets/icons/file-loader.gif' width={80} height={26} alt='loader' className='w-full'></Image>
        </div>
    );
}

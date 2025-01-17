"use client"
import { Button } from '@/components_shadcn/ui/button'
import { cn, convertFileToUrl, getFileType } from '@/lib/utils'
import { FileUploaderProps } from '@/types/props'
import Image from 'next/image'
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Thumbnail from '../elements/Thumbnail'

export default function FileUploader({ownerId,accountId,className}:FileUploaderProps) {
  const [files,setFiles] = useState<File[]>([])

  const onDrop = useCallback(async (acceptedFiles:File[]) => {
    setFiles(acceptedFiles)
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  function handleRemoveFile(e:React.MouseEvent<HTMLImageElement>, fileName: string){
    e.stopPropagation()
    setFiles(currentFiles => currentFiles.filter(file => file.name !== fileName))
  }
  return (
    <div {...getRootProps()} className='cursor-pointer '>
      <input {...getInputProps()} />
      <Button type='button' className={cn('uploader-button',className)}>
        <Image src='/assets/icons/upload.svg' width={24} height={24} alt='upload'/>
        <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className='uploader-preview-list'>
          <h4 className='h4 text-light-100'>Uploading</h4>
          {files.map((file,index) =>{
            const {type, extension} = getFileType(file.name)
            return (
            <li key={index} className='uploader-preview-item'>
              <div className='flex items-center gap-3'>
                <Thumbnail type={type} extension={extension} url={convertFileToUrl(file)}/>
              </div>
              <div className='preview-item-name'>
                <p>
                  {file.name}
                </p>
                <Image src='/assets/icons/file-loader.gif' width={80} height={26} alt='loader' className='w-full'></Image>
              </div>
              <Image src='/assets/icons/remove.svg' width={24} height={24} alt='remove'
              onClick={(e)=>{
                handleRemoveFile(e,file.name)
              }}
              />
            </li>
          )
          })}
        </ul>
      )}
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}
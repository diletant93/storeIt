"use client"
import { Button } from '@/components_shadcn/ui/button'
import { cn, convertFileToUrl, getFileType } from '@/lib/utils'
import { FileUploaderProps } from '@/types/props'
import Image from 'next/image'
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Thumbnail from '../elements/Thumbnail'
import UploadingFilePreview from '../elements/UploadingFilePreview'
import FileItem from '../elements/FileItem'
import FileList from '../elements/FileList'

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
      <FileList files={files} onRemoveFile={handleRemoveFile}/>
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}
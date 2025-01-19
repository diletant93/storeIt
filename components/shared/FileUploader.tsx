"use client"
import { Button } from '@/components_shadcn/ui/button'
import { cn } from '@/lib/utils'
import { FileUploaderProps } from '@/types/props'
import Image from 'next/image'
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import FileList from '../elements/FileList'
import { MAX_FILE_SIZE } from '@/constants'
import { useToast } from '@/hooks/use-toast'
import { uploadFile } from '@/lib/actions/file.actions'
import { usePathname } from 'next/navigation'
import { Models } from 'node-appwrite'

export default function FileUploader({ownerId,accountId,className}:FileUploaderProps) {
  const [files,setFiles] = useState<File[]>([])
  const {toast} = useToast()
  const pathname = usePathname()
  const onDrop = useCallback(async (acceptedFiles:File[]) => {
    setFiles(acceptedFiles)
    const uploadPromises = acceptedFiles.map(async(file)=>{
      if(file.size > MAX_FILE_SIZE){
        setFiles(cur => cur.filter(curFile => curFile.name !== file.name)) 
        return toast({description:(<p className='body-2 text-white'>
          <span className='font-semibold'>
            {file.name}{' '}
          </span>
           is too large. Max file size is 50
        </p>),
        className:'error-toast'})
      }
      return uploadFile({file, ownerId, accountId, path:pathname })
      .then((uploadedFile:Models.Document)=>{
        if(uploadedFile){
          setFiles(cur => cur.filter(file => file.name !== uploadedFile.name))
        }
      })
    })
    await Promise.all(uploadPromises)
  }, [ownerId,accountId,pathname])
  const {getRootProps, getInputProps} = useDropzone({onDrop})
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
    </div>
  )
}
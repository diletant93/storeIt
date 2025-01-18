'use server';

import { UploadFileType } from '@/types/types';
import { createAdminClient } from '../appwrite';
import { InputFile } from 'node-appwrite/file';
import { appwriteConfig } from '../appwrite/config';
import { ID } from 'node-appwrite';
import { constructFileUrl, getFileType, parseStringify } from '../utils';
import { revalidatePath } from 'next/cache';
import { error } from 'console';
export async function uploadFile({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileType) {
  try {
    const { storage, databases } = await createAdminClient();
    const inputFile = InputFile.fromBuffer(file, file.name);
    const storageFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        inputFile
    );
    const fileDocument = {
        type: getFileType(storageFile.name).type,
        name: storageFile.name,
        url: constructFileUrl(storageFile.$id),
        extension: getFileType(storageFile.name).extension,
        size: storageFile.sizeOriginal,
        storageFileId: storageFile.$id,
        owner:ownerId,
        accountId:accountId,
    }
    const newFile = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesColectionId,
        ID.unique(),
        fileDocument
    ).catch(async(error: unknown)=>{
        await storage.deleteFile(appwriteConfig.storageId, storageFile.$id)
        if(error instanceof Error){
            throw error
        }
        throw new Error('Could not create a new file')
    })
    
    revalidatePath(path)
    return parseStringify(newFile)
  } catch (error) {
    console.log(error);
    throw error;
  }
}

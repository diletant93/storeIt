'use server';

import {
  IUserType,
  renameFileType,
  updateFileUsersType,
  UploadFileType,
} from '@/types/types';
import { createAdminClient } from '../appwrite';
import { InputFile } from 'node-appwrite/file';
import { appwriteConfig } from '../appwrite/config';
import { ID, Models, Query } from 'node-appwrite';
import { constructFileUrl, getFileType, parseStringify } from '../utils';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './user.actions';
import { redirect } from 'next/navigation';
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
      inputFile,
    );

    const fileDocument = {
      type: getFileType(storageFile.name).type,
      name: storageFile.name,
      url: constructFileUrl(storageFile.$id),
      extension: getFileType(storageFile.name).extension,
      size: storageFile.sizeOriginal,
      storageFileId: storageFile.$id,
      owner: ownerId,
      accountId: accountId,
    };

    const newFile = await databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesColectionId,
        ID.unique(),
        fileDocument,
      )
      .catch(async (error: unknown) => {
        await storage.deleteFile(appwriteConfig.storageId, storageFile.$id);
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Could not create a new file');
      });

    revalidatePath(path);
    return parseStringify(newFile);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getFiles() {
  try {
    const { databases } = await createAdminClient();
    const currentUser = await getCurrentUser();
    if (!currentUser) return redirect('/sign-in');

    const queries = createQueries(currentUser);
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesColectionId,
      queries,
    );

    if (result.total <= 0) throw new Error('there are no files yet');

    return result.documents;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
function createQueries(currentUser: IUserType) {
  const queries = [
    Query.or([
      Query.equal('owner', currentUser.$id),
      Query.contains('users', currentUser.email),
    ]),
  ];
  //TODO: search , sort ,limits...
  return queries;
}
export async function renameFile({
  fileId,
  name,
  extension,
  path,
}: renameFileType) {
  try {
    const { databases } = await createAdminClient();
    const newName = `${name}.${extension}`;
    const updatedFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesColectionId,
      fileId,
      {
        name: newName,
      },
    );
    revalidatePath(path);
    return updatedFile;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateFileUsers({
  fileId,
  emails,
  path,
}: updateFileUsersType) {
  try {
    const { databases } = await createAdminClient();
    
    const allValuesExist = await isAvailableEmails(emails)
    if(!allValuesExist) throw new Error('You entered an unexisting email')
  
    const updatedFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesColectionId,
      fileId,
      {
        users: emails,
      },
    );
    revalidatePath(path);
    return updatedFile;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function isAvailableEmails(emails: string[]) {
  try {
    const { databases } = await createAdminClient();
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersColectionId,
    );

    const availableEmails = (users.documents as IUserType[]).map(
      (user) => user.email,
    );

    const availableEmailSet = new Set(availableEmails);
    const allValuesExist = emails.every((email) =>
      availableEmailSet.has(email),
    );

    console.log(allValuesExist)

    return allValuesExist;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function isEnteredOwnEmail(emails:string[]){
  try {
    const currentUser = await getCurrentUser()
    const emailsSet = new Set(emails)
    console.log('emailSet:',emailsSet)
    return emailsSet.has(currentUser!.email)
  } catch (error) {
    console.log(error);
    throw error;
  }
}
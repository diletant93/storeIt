'use server';

import {
  createQueriesType,
  deleteFileType,
  FileType,
  getFilesType,
  IFileType,
  IUserType,
  renameFileType,
  updateFileUsersType,
  UploadFileType,
} from '@/types/types';
import { createAdminClient, createSessionClient } from '../appwrite';
import { InputFile } from 'node-appwrite/file';
import { appwriteConfig } from '../appwrite/config';
import { ID, Query } from 'node-appwrite';
import { constructFileUrl, getFileType, parseStringify } from '../utils';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './user.actions';
import { redirect } from 'next/navigation';
import { TYPES } from '@/constants';
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

export async function getFiles({
  types=TYPES,
  searchText = '',
  sort = '$createdAt-desc',
  limit = 10,
  page = 1
}: getFilesType) {
  try {
    const { databases } = await createAdminClient();
    const currentUser = await getCurrentUser();
    if (!currentUser) return redirect('/sign-in');
    const queries = createQueries({
      currentUser,
      types,
      searchText,
      sort,
      limit,
    });
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesColectionId,
      queries,
      
    );

    if (result.total <= 0) return null;

    return result.documents as IFileType[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
function createQueries({
  currentUser,
  types,
  sort='$createdAt-desc',
  limit=10,
  searchText,
  page=1 
}: createQueriesType) {
  const queries = [
    Query.or([
      Query.equal('owner', currentUser.$id),
      Query.contains('users', currentUser.email),
    ]),
  ];
  if (types && !types.includes('all')){
     queries.push(Query.equal('type', types));
  }
  if (searchText) queries.push(Query.contains('name', searchText));
  if (sort) {
    console.log(sort)
    const [sortBy, orderBy] = sort.split('-');
    queries.push(
      orderBy === 'asc' ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy),
    );
  }
  const skip = (page - 1) * limit
  queries.push(Query.offset(skip),Query.limit(limit)
)
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
  console.log('inside update');
  try {
    const { databases } = await createAdminClient();
    console.log('emails:', emails);
    const allValuesExist = await isAvailableEmails(emails);
    console.log('allValuesExist:', allValuesExist);
    if (!allValuesExist) throw new Error('You entered an unexisting email');

    const isOwnEmail = await isEnteredOwnEmail(emails);
    console.log('isOwnEmail', isOwnEmail);
    if (isOwnEmail) {
      console.log('inside throwing an error own email');
      throw new Error('You entered your own email');
    }

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

    console.log(allValuesExist);

    return allValuesExist;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function isEnteredOwnEmail(emails: string[]) {
  try {
    const currentUser = await getCurrentUser();
    const emailsSet = new Set(emails);
    console.log('emailSet:', emailsSet);
    return emailsSet.has(currentUser!.email);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteFile({ file, path }: deleteFileType) {
  try {
    const { databases, storage } = await createAdminClient();
    const deletedFile = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesColectionId,
      file.$id,
    );
    if (!deletedFile) throw new Error('could not delete the file');
    await storage.deleteFile(appwriteConfig.storageId, file.storageFileId);

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getTotalSpaceUsed() {
  try {
    const { databases } = await createSessionClient();
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User is not authenticated.");

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesColectionId,
      [Query.equal("owner", [currentUser.$id])],
    );

    const totalSpace = {
      image: { size: 0, latestDate: "" },
      document: { size: 0, latestDate: "" },
      video: { size: 0, latestDate: "" },
      audio: { size: 0, latestDate: "" },
      other: { size: 0, latestDate: "" },
      used: 0,
      all: 2 * 1024 * 1024 * 1024 /* 2GB available bucket storage */,
    };

    files.documents.forEach((file) => {
      const fileType = file.type as FileType;
      totalSpace[fileType].size += file.size;
      totalSpace.used += file.size;

      if (
        !totalSpace[fileType].latestDate ||
        new Date(file.$updatedAt) > new Date(totalSpace[fileType].latestDate)
      ) {
        totalSpace[fileType].latestDate = file.$updatedAt;
      }
    });

    return parseStringify(totalSpace);
  } catch (error) {
   console.log(error)
   throw error
  }
}
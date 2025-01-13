export const appwriteConfig = {
  endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  usersColectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
  filesColectionId: process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION_ID!,
  secretKey: process.env.NEXT_APPWRITE_SECRET_KEY!,
};

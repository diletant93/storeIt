'use server';

import { createAccountType } from '@/types/types';
import { createAdminClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';
import { Query, ID } from 'node-appwrite';
import { handleError, parseStringify } from '../utils';


async function getUserByEmail(email: string) {
  const { databases } = await createAdminClient();
  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersColectionId,
    [Query.equal('email', email)],
  );
  return result.total > 0 ? result.documents[0] : null;
}
async function sendEmailOTP({email}:{email:string}) {
    const {account} = await createAdminClient()
    try {
        const session = await account.createEmailToken(ID.unique(),email)
        return session.userId
    } catch (error) {
        handleError(error, 'could not send email OTP')
    }
}
export async function createAccount({ fullName, email }: createAccountType) {
  if (!fullName || !email) throw new Error('No fullname or email was provided');

  const existingUser = await getUserByEmail(email);

  const accountId =await sendEmailOTP({email})
  if(! accountId) handleError(new Error('could not send an OTP'), 'could not send an OTP')
  if(!existingUser){
    const {databases} = await createAdminClient()
    const createdUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersColectionId,
        ID.unique(),
        {
            fullName,
            email,
            avatar: '/assets/images/avatar.png',
            accountId
        }
    )
  }
  return parseStringify({accountId})

}

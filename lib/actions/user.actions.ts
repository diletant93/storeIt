'use server';

import { createAccountType, IUserType, SecretCodeType } from '@/types/types';
import { createAdminClient, createSessionClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';
import { Query, ID } from 'node-appwrite';
import { handleError, parseStringify } from '../utils';
import { cookies } from 'next/headers';
import { AVATAR_PLACEHOLDER_PATH, SESSION_NAME } from '@/constants';
import { redirect } from 'next/navigation';

async function getUserByEmail(email: string) {
  try {
    console.log('inside user by email')
    const { databases } = await createAdminClient();
    console.log('inside user by email email:',email)
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersColectionId,
      [Query.equal('email', email)],
    );
    return result.total > 0 ? result.documents[0] : null;
  } catch (error) {
    handleError(error, 'Could not get user by email');
  }
}
export async function sendEmailOTP({ email }: { email: string }) {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailToken(ID.unique(), email); // checks if client with such an email exists and if not creates one , if it does it sends an error
    return session.userId;
  } catch (error) {
    handleError(error, 'could not send email OTP');
  }
}
export async function createAccount({ fullName, email }: createAccountType) {
  if (!fullName || !email) throw new Error('No fullname or email was provided');

  const existingUser = await getUserByEmail(email);
  if (existingUser)
    return {error:'Such a user already exists'}

  const accountId = await sendEmailOTP({ email });
  if (!accountId)
    handleError(new Error('could not send an OTP'), 'could not send an OTP');

  const { databases } = await createAdminClient();
  const createdUser = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.usersColectionId,
    ID.unique(),
    {
      fullName,
      email,
      avatar: AVATAR_PLACEHOLDER_PATH,
      accountId,
    },
  );
  return parseStringify({ accountId });
}
export async function cleanUser({email}:{email:string}){
  try {
    console.log('inside cleanUser')
    const {databases,users} = await createAdminClient()
    console.log('inside db')
    const user = await getUserByEmail(email)
    console.log('inside user:',user)
    if(user) {
      const deleteAcc = await users.delete(user.accountId)
      console.log('deletedAcc', deleteAcc)
      const deleted = await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersColectionId,
        user.$id
      )
      console.log('deleted:',deleted)
      return null
    }
    return {error:'smth went wrong while cleaning the user'}
  } catch (error) {
    return {error:'smth went wrong while cleaningdasda the user'}
  }
}
export async function verifySecretCode({
  accountId,
  password,
}: SecretCodeType) {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(accountId, password);

    (await cookies()).set(SESSION_NAME, session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {}
}

export async function getCurrentUser() {
  try {
    const { databases, account } = await createSessionClient();
    
    const result = await account.get();
    if(!result) return redirect('/sign-in')

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersColectionId,
      [Query.equal('accountId', result.$id)],
    );
    if (user.total <= 0) return null;
    return (parseStringify(user.documents[0])) as IUserType;
  } catch (error) {
    handleError(error, 'Could not get the current user');
  }
}

export async function signOut() {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession('current');
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_NAME);
  } catch (error) {
    handleError(error, 'Could not sign out');
  } finally {
    return redirect('/sign-in');
  }
}

export async function signIn({ email }: { email: string }) {
  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser)
      return {error:'Such an email does not exist'}
    await sendEmailOTP({ email });
    return parseStringify({ accountId: existingUser.accountId });
  } catch (error) {
    handleError(error, 'Could not sign in');
  }
}

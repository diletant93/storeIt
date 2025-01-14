'use server';

import { createAccountType, SecretCodeType } from '@/types/types';
import { createAdminClient, createSessionClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';
import { Query, ID } from 'node-appwrite';
import { handleError, parseStringify } from '../utils';
import { cookies } from 'next/headers';
import { AVATAR_PLACEHOLDER_PATH } from '@/constants';

async function getUserByEmail(email: string) {
  try {
    const { databases } = await createAdminClient();
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
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, 'could not send email OTP');
  }
}
export async function createAccount({ fullName, email }: createAccountType) {
  if (!fullName || !email) throw new Error('No fullname or email was provided');

  const existingUser = await getUserByEmail(email);

  const accountId = await sendEmailOTP({ email });
  if (!accountId)
    handleError(new Error('could not send an OTP'), 'could not send an OTP');
  if (!existingUser) {
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
  }
  return parseStringify({ accountId });
}

export async function verifySecretCode({
  accountId,
  password,
}: SecretCodeType) {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(accountId, password);

    (await cookies()).set('appwrite-session', session.secret, {
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
    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersColectionId,
      [Query.equal('accountId', result.$id)],
    );
    console.log(user.total)
    if (user.total <= 0) return null;
    return parseStringify(user.documents[0]);
  } catch (error) {
    handleError(error, 'Could not get the current user');
  }
}

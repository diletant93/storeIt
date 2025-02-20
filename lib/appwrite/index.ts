"use server"
import {  Account, Avatars, Client, Databases, Storage, Users } from "node-appwrite"
import { appwriteConfig } from "./config"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SESSION_NAME } from "@/constants"

export const createSessionClient = async function(){
    const client = new Client()
    client.setEndpoint(appwriteConfig.endpointUrl)
    client.setProject(appwriteConfig.projectId)

    const session = (await cookies()).get(SESSION_NAME)
    if(!session || !session.value) redirect('/sign-up')

    client.setSession(session.value)
    return {
        get account(){
            return new Account(client)
        },
        get databases(){
            return new Databases(client)
        },
    }
}

export const createAdminClient = async function(){
    const client = new Client()
    client.setEndpoint(appwriteConfig.endpointUrl)
    client.setProject(appwriteConfig.projectId)
    client.setKey(appwriteConfig.secretKey)
    return {
        get account(){
            return new Account(client)
        },
        get databases(){
            return new Databases(client)
        },
        get storage(){
            return new Storage(client)
        },
        get avarats(){
            return new Avatars(client)
        },
        get users(){
            return new Users(client)
        }
    }
}
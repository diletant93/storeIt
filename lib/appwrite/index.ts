import {  Account, Avatars, Client, Databases, Storage } from "node-appwrite"
import { appwriteConfig } from "./config"
import { cookies } from "next/headers"

export const createSessionClient = async function(){
    const client = new Client()
    client.setEndpoint(appwriteConfig.endpointUrl)
    client.setProject(appwriteConfig.projectId)

    const session = (await cookies()).get('appwrite-session')
    if(!session || !session.value) throw new Error('Could not create a session')

    client.setSession(session.value)
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
        }
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
        }
    }
}
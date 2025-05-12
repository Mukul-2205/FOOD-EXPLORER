import {Client, Databases, ID, Query} from 'appwrite'
import envconfig from '../envconfig/envconfig.js'

export class Service{
    client=new Client
    databases;

    constructor(){
        this.client
            .setEndpoint(envconfig.appwriteURI)
            .setProject(envconfig.appwriteProjectId)
        this.databases=new Databases(this.client)
    }

    async createUser(data){
        try {
            return await this.databases.createDocument(
                envconfig.appwriteDatabaseId,
                envconfig.appwriteCollection,
                ID.unique(),
                data
            )
        } catch (error) {
            console.log("Error while creating user: ",error);
            alert("Error while creating user: ",error.message)
            
        }
    }

    async getUser(userId){
        try {
            return await this.databases.listDocuments(
                envconfig.appwriteDatabaseId,
                envconfig.appwriteCollection,
                [
                    Query.equal("user_id",userId)
                ]
            )
        } catch (error) {
            console.log("Error while getting user: ",error);
            alert("Error while getting user: ",error.message)
            
        }
    }
}

const service=new Service()
export default service
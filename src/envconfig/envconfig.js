const envconfig={
    appwriteURI: String(import.meta.env.VITE_APPWRITE_URI),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollection: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID)
    
}

export default envconfig
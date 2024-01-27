const conf= {
  appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
  appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteArticleCollectionId:String(import.meta.env.VITE_APPWRITE_ARTICLE_COLLECTION_ID),
  appwriteCommentCollectionId:String(import.meta.env.VITE_APPWRITE_COMMENT_COLLECTION_ID),
  appwriteLikesCollectionId:String(import.meta.env.VITE_APPWRITE_LIKES_COLLECTION_ID),
  appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  tinymceApiKey:String(import.meta.env.VITE_TINY_MCE_API_KEY)
}

export default conf
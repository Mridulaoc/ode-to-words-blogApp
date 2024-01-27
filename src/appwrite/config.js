import conf from '../conf/conf'
import { Client,ID,Databases, Storage,Query } from "appwrite";

export class DbServices{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl) 
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,featuredImage,status,content,username,author}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                slug,
                {
                    title,
                    featuredImage,
                    status,
                    username,
                    content,
                    author
                }
            )
        } catch (error) {

            throw new Error(error)
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                slug,
            )
            return true;
        } catch (error) {
           console.log(error)
            return false;
        }
    }

    async updatePost(slug,{title,featuredImage,status,content}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                slug,
                {
                    title,
                    featuredImage,
                    status,
                    content,
                }
            )
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async getPost(slug){
       try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                slug,
        )
        
       } catch (error) {
        console.log(error);
        return false;
       }
    }


    async getPosts(queries=[Query.equal("status","active")]){

        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                queries,
            )
            
        } catch (error) {
            console.log(error)
            return false;
            
        }     

    }

    async upload(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )

            
        } catch (error) {
            console.log(error);
            
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId,
    
            )
            return true;
        } catch (error) {
            console.log(error)
            return false;
            
        }
       
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            console.log(error)
            
        }
    }

    async createComment({post_id,user_id,comment,author}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                ID.unique(),
                
                {
                   post_id,
                   user_id,
                   comment,
                   author

                }
            )
        } catch (error) {

            throw new Error(error)
            
        }
    }

    async getComments(queries){

        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                queries,
            )
            
        } catch (error) {
            console.log(error)
            return false;
            
        }     

    }

    async createLikes({post_id,Liked_by}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteLikesCollectionId ,                 
                ID.unique(),
                {
                   post_id,
                   Liked_by

                }
            )
        } catch (error) {

            throw new Error(error)
            
        }
    }

    async getLikes(queries){

        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteLikesCollectionId,
                queries,
            )
            
        } catch (error) {
            console.log(error)
            return false;
            
        }     

    }

    async deleteLike(id){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteLikesCollectionId,
                id
            )
            return true;
        } catch (error) {
           console.log(error)
            return false;
        }
    }







}

const dbServices= new DbServices;
export default dbServices;



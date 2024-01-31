import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";

export class AuthService {
   
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl) 
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }

    async createAccount ({email,password,name}){
       
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await this.account.create(ID.unique(), email, password,name);
            if(userAccount){
                return this.login({email,password});
            }else{
                return userAccount;
            }
            
        } catch (error) {
            throw error;
        }
    }

    async login ({email, password}){
        
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
           throw error;
        }
    }

    async getCurrentUser(){
        
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error)
            return null;
        }    
       
    }

    async logout(){
        
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log(error)
        }
    }

    createGoogleAuthentication(){

        try {
            return this.account.createOAuth2Session('google','https://ode-to-words.vercel.app', 'https://ode-to-words.vercel.app/signUp')
            
        } catch (error) {
            console.log(error)
            
        }
        
    }  
    
    async getCurrentSession(){
        try {

            return await this.account.getSession('current')
            
        } catch (error) {

            console.log(error)
            
        }
    }
}

const authService = new AuthService();
export default authService;
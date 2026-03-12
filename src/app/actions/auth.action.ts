"use server"

import {
    ChangeUserPassword,
    ChangeUserRole,
    EditUserProfile,
    LoginUser,
    SignupUser
} from "@/servers/validations/auth.validation";
import {ResponseMessage} from "@/servers/utils/responseMessage.util";
import {UserDto} from "@/servers/dto/user.dto";
import {Session} from "@/servers/models/session.model";
import {authService} from "@/servers/services/auth.service";
import {redirect} from "next/navigation";

export async function changeUserPasswordAction(request: ChangeUserPassword):Promise<ResponseMessage>{
    //----> Change user password
    try{
        await authService.changeUserPassword(request);
        redirect("/")
    }catch (error){
        throw error;
    }

}

export async function changeUserRoleAction(request: ChangeUserRole):Promise<ResponseMessage>{
   //----> Change user role
    try {
       await authService.changeUserRole(request);
       redirect("/users");
   }catch (error){
        throw error;
    }
}

export async function editUserProfileAction(request: EditUserProfile){
    //----> Edit user profile
    try{
        await authService.editUserProfile(request);
        redirect("/");
    }catch (error){
        throw error;
    }
}

export async function getCurrentUserAction():Promise<UserDto>{
   //----> Get current user
    try {
       return await authService.getCurrentUser();
   }catch (error){
       throw error;
   }
}

export async function getUserSessionAction():Promise<Session>{
    //----> Get user session
    try {
        return await authService.getUserSession();
    }catch (error){
        throw error;
    }
}

export async function loginUserAction(request: LoginUser): Promise<Session>{
  //----> Login user
    try{
        return await authService.loginUser(request);
    }catch (error){
        throw error;
    }
}

export async function logoutUserAction(){
   //----> Logout user
    try{
        await authService.logoutUser();
        redirect('/login')
    }catch (error){
        throw error;
    }
}

export async function refreshUserTokenAction(): Promise<Session>{
   //----> Refresh user token
    try{
        return await authService.refreshUserToken();
    }catch (error){
        throw error;
    }
}

export async function signupUserAction(request: SignupUser){
    console.log("In signupUser, request : ", request);
    //----> Signup user
    try{
        await authService.signupUser(request);
        redirect('/login')
    }catch (error){
        throw error;
    }
}

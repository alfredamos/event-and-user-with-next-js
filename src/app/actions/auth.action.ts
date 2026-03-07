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

export async function changeUserPasswordAction(request: ChangeUserPassword):Promise<ResponseMessage>{
    //----> Change user password
    try{
        return await authService.changeUserPassword(request);
    }catch (error){
        throw error;
    }

}

export async function changeUserRoleAction(request: ChangeUserRole):Promise<ResponseMessage>{
   //----> Change user role
    try {
       return await authService.changeUserRole(request);
   }catch (error){
        throw error;
    }
}

export async function editUserProfileAction(request: EditUserProfile): Promise<ResponseMessage>{
    //----> Edit user profile
    try{
        return await authService.editUserProfile(request);
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

export async function loginUserAction(request: LoginUser): Promise<Session>{
  //----> Login user
    try{
        return await authService.loginUser(request);
    }catch (error){
        throw error;
    }
}

export async function logoutUserAction(): Promise<Session>{
   //----> Logout user
    try{
        return await authService.logoutUser();
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

export async function signupUserAction(request: SignupUser): Promise<ResponseMessage>{
    //----> Signup user
    try{
        return await authService.signupUser(request);
    }catch (error){
        throw error;
    }
}

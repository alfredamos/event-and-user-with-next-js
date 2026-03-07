"use server"

import {userService} from "@/servers/services/user.service";

export async function deleteUserByIdAction(id: string){
    //----> Delete user by id.
    try {
        return await userService.deleteUserById(id);
    }catch (error) {
        throw error
    }
}

export async function getAllUsersAction(){
    //----> Retrieve all users.
    try {
        return await userService.getAllUsers();
    }catch (error) {
        throw error
    }
}

export async function getUserByIdAction(id: string){
    //----> Fetch user by id.
    try {
        return await userService.getUserById(id);
    }catch (error) {
        throw error
    }
}
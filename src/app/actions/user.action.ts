"use server"

import {userService} from "@/servers/services/user.service";
import {redirect} from "next/navigation";

export async function deleteUserByIdAction(id: string){
    //----> Delete user by id.
    try {
        await userService.deleteUserById(id);
        redirect("/users")
    }catch (error) {
        throw error
    }
}

export async function getAllUsersAction(query?: string){
    //----> Retrieve all users.
    try {
        return await userService.getAllUsers(query);
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
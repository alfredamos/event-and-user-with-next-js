import {IUserService} from "@/servers/services/iuser.service";
import {fromUserToUserDto, UserDto} from "../dto/user.dto";
import { ResponseMessage } from "../utils/responseMessage.util";
import {prisma} from "@/servers/db/prisma";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";

class UserService implements IUserService {
    async deleteUserById(id: string): Promise<ResponseMessage> {
        //----> Check if user exists
        await this.getOneUser(id);

        //----> Delete user from database
        await prisma.user.delete({where: {id}});

        //----> Send email to the user with a token
        return new ResponseMessage("User deleted successfully!", "success", StatusCodes.OK);
    }

    async getAllUsers(): Promise<UserDto[]> {
      //----> Fetch all users from a database
       const users = await prisma.user.findMany({});

       //----> Send back response.
       return users.map(fromUserToUserDto);
    }

    async getUserById(id: string): Promise<UserDto> {
        //----> Check if user exists
        const user = await this.getOneUser(id);

        //----> Send back response.
        return fromUserToUserDto(user);
    }

    private async getOneUser(id: string) {
        //----> Fetch user with id from a database
        const user = await prisma.user.findUnique({where: {id}});

        //----> Check if user exists
        if(!user) throw catchError(StatusCodes.NOT_FOUND, "User not found");

        //----> Send back user.
        return user;
    }

}

export const userService = new UserService();
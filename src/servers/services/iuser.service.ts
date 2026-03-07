import {UserDto} from "@/servers/dto/user.dto";
import {ResponseMessage} from "@/servers/utils/responseMessage.util";

export interface IUserService {
    deleteUserById(id: string): Promise<ResponseMessage>;
    getAllUsers(): Promise<UserDto[]>;
    getUserById(id: string): Promise<UserDto>;
}
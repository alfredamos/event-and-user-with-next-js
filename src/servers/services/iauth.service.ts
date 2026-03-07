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

export interface IAuthService {
    changeUserPassword(changePassword: ChangeUserPassword): Promise<ResponseMessage>;
    changeUserRole(changeRole: ChangeUserRole): Promise<ResponseMessage>;
    editUserProfile(editProfile: EditUserProfile): Promise<ResponseMessage>;
    getCurrentUser(): Promise<UserDto>
    loginUser(login: LoginUser): Promise<Session>;
    logoutUser(): Promise<Session>;
    refreshUserToken(): Promise<Session>;
    signupUser(signup: SignupUser): Promise<ResponseMessage>;
}
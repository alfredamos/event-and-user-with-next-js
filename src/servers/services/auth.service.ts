import {IAuthService} from "@/servers/services/iauth.service";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import catchError from "http-errors";
import {fromUserToUserDto, UserDto} from "../dto/user.dto";
import {Session} from "../models/session.model";
import {ResponseMessage} from "../utils/responseMessage.util";
import {
    ChangeUserPassword,
    changeUserPasswordSchema,
    ChangeUserRole, changeUserRoleSchema,
    editProfileUserSchema,
    EditUserProfile,
    LoginUser,
    SignupUser,
    signupUserSchema
} from "../validations/auth.validation";
import {StatusCodes} from "http-status-codes";
import {prisma} from "@/servers/db/prisma";
import {fromEditUserToUser} from "@/servers/dto/fromEditUserToUser.dto";
import {validateWithZodSchema} from "@/servers/validations/zodSchema.validation";
import {fromSignupUserToUser} from "@/servers/dto/fromSignupUserToUser";
import {TokenJwt} from "@/servers/models/TokenJwt.model";
import {JwtPayload} from "@/servers/models/JwtPayload";
import {cookies} from 'next/headers';
import {Role, TokenType, User} from "@/generated/prisma/client";
import {tokenService} from "@/servers/services/token.service";
import {AuthParam} from "@/servers/utils/authParam.util";
import {TokenUncheckedCreateInput} from "@/generated/prisma/models/Token";

class AuthService implements IAuthService {
    async changeUserPassword(request: ChangeUserPassword): Promise<ResponseMessage> {
        //----> Validate inputs.
        if (!validateWithZodSchema(changeUserPasswordSchema, request)){
            throw catchError(StatusCodes.BAD_REQUEST, "Invalid inputs");
        }

        //----> Check for passwords match.
        if(this.passwordsNotMatch(request.newPassword, request.confirmPassword)){
            throw catchError(StatusCodes.BAD_REQUEST, "Passwords do not match");
        }

        //----> Check for existence of user.
        const user = await this.getOneUserByEmail(request.email);

        //----> Check for valid password.
        if (await this.passwordNotValid(request.password, user!.password)){
            throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
        }

        //----> Hash the new password.
        const hashedPassword = await bcrypt.hash(request.newPassword, 12);

        //----> Save the changes in the db.
        await prisma.user.update({where: {email: request.email}, data:{...user, password: hashedPassword}});

        //----> Send email to the user with a token
        return new ResponseMessage("Password changed", "success", StatusCodes.OK);
    }

    async changeUserRole(request: ChangeUserRole): Promise<ResponseMessage> {
        //----> Validate inputs.
        if (!validateWithZodSchema(changeUserRoleSchema, request)){
            throw catchError(StatusCodes.BAD_REQUEST, "Invalid inputs");
        }

        //----> Get user session.
        const session = await this.getUserSession();

        //----> Check for admin privilege.
        if (session.role !== Role.Admin){
            throw catchError(StatusCodes.FORBIDDEN, "You are not authorized to perform this action");
        }

        //----> Check for existence of user.
        const user = await this.getOneUserByEmail(request.email);

        //----> Change user role.
        const userRole = user!.role === Role.User ? Role.Admin : Role.User;

        //----> Save the changes in the db.
        await prisma.user.update({where: {email: request.email}, data:{...user, role: userRole}});

        //----> Send email to the user with a token
        return new ResponseMessage("Role changed successfully!", "success", StatusCodes.OK);
    }

    async editUserProfile(request: EditUserProfile): Promise<ResponseMessage> {
        //----> Validate inputs.
        if (!validateWithZodSchema(editProfileUserSchema, request)){
            throw catchError(StatusCodes.BAD_REQUEST, "Invalid inputs");
        }

        //----> Check for existence of user.
        const user = await this.getOneUserByEmail(request.email);

        //----> Check for valid password.
        if (await this.passwordNotValid(request.password, user!.password)){
            throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
        }

        //----> Map edit user profile request to user update.
        request.password = user!.password;
        request.role = user!.role;
        const userToEdit = fromEditUserToUser(request, user!.id);

        //----> Save the changes in the db.
        await prisma.user.update({where: {email: request.email}, data: userToEdit});

        //----> Send email to the user with a token
        return new ResponseMessage("Profile updated", "success", StatusCodes.OK);
    }

    async getCurrentUser(): Promise<UserDto> {
        //----> Get user session.
        const session = await this.getUserSession();

        //----> Get the current user.
        const user = await this.getOneUserByEmail(session.email);
        return fromUserToUserDto(user!)
    }

    async loginUser(request: LoginUser): Promise<Session> {
        //----> Check for existence of user.
        const user = await this.getOneUserByEmail(request.email);

        //----> Check for invalid password.
        if(await this.passwordNotValid(request.password, user!.password)){
            throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
        }

        //----> Get tokenJwt from user.
        const tokenJwt = this.fromUserToTokenJwt(user!);

        //----> Generate tokens and cookies.
        return this.generateTokensAndCookies(tokenJwt);

    }

    async logoutUser(): Promise<Session> {
        //----> Get user session.
       const session = await this.getUserSession();

       //----> Revoke all valid tokens associated with this user.
       await tokenService.revokeAllValidTokensByUserId(session.id);

       //----> Delete access-token-cookie and refresh-token-cookie.
       await this.deleteCookie(AuthParam.accessTokenName, AuthParam.accessTokenPath);
       await this.deleteCookie(AuthParam.refreshTokenName, AuthParam.refreshTokenPath);

       //----> Send back response.
        return new Session();
    }

    async refreshUserToken(): Promise<Session> {
        //----> Get refresh-token.
        const token = await this.getCookie(AuthParam.refreshTokenName);

        //----> Validate refresh-token.
        const tokenJwt = this.validateToken(token);

        //----> Generate tokens and cookies.
        return this.generateTokensAndCookies(tokenJwt);
    }

    async signupUser(request: SignupUser): Promise<ResponseMessage> {
        //----> Check for valid inputs.
        if (!validateWithZodSchema(signupUserSchema, request)){
            throw catchError(StatusCodes.BAD_REQUEST, "Invalid inputs");
        }

        //----> Check for match passwords.
        if (this.passwordsNotMatch(request.confirmPassword, request.password)){
            throw catchError(StatusCodes.BAD_REQUEST, "Passwords do not match");
        }

        //----> Check for existence of user.
        const user = await this.getOneUserByEmail(request.email);
        if (user){
            throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
        }

        //----> Hash the password.
        request.password = await bcrypt.hash(request.password, 12);

        //----> Map sign-up-user to user.
        const newUser = fromSignupUserToUser(request);

        //----> Save the user in the db.
        await prisma.user.create({data: newUser});

        //----> Send email to the user with a token
        return new ResponseMessage("User created", "success", StatusCodes.OK);

    }

    async generateTokensAndCookies(tokenJwt: TokenJwt){
        //----> Revoke all valid tokens associated with this user
        await tokenService.revokeAllValidTokensByUserId(tokenJwt.id);

        //----> Generate access-token.
        const accessToken = this.generateToken(tokenJwt, AuthParam.accessTokenExpiresIn);
        await this.setCookie(AuthParam.accessTokenName, accessToken, AuthParam.accessTokenPath, AuthParam.accessTokenExpiresIn)

        //----> Generate refresh-token.
        const refreshToken = this.generateToken(tokenJwt, AuthParam.refreshTokenExpiresIn);
        await this.setCookie(AuthParam.refreshTokenName, refreshToken, AuthParam.refreshTokenPath, AuthParam.refreshTokenExpiresIn);

        //----> Make a token object and save it in the db.
        const tokenObject = this.makeTokenObject(tokenJwt.id, accessToken, refreshToken);
        await tokenService.createToken(tokenObject);

        //----> Make a session object.
        return this.makeSession(tokenJwt, accessToken);
    }

    async getUserSession(): Promise<Session>{
        //----> Get cookie.
       const token = await this.getCookie(AuthParam.accessTokenName);

       //----> Validate token.
       const tokenJwt = this.validateToken(token);

       //----> Make a session object.
       return this.makeSession(tokenJwt, token);
    }

    private passwordsNotMatch(passWordOne: string, passwordTwo: string): boolean{
        return passWordOne.normalize() !== passwordTwo.normalize();
    }

    private async passwordNotValid(rawPassword: string, encodedPassword: string): Promise<boolean>{
        return !await bcrypt.compare(rawPassword, encodedPassword);
    }

    private getOneUserByEmail(email: string){
        //----> Get user by email.
        const user = prisma.user.findUnique({where: {email}});

        //----> Check if user exists.
        if(!user){
            throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
        }

        //----> Return user.
        return user;
    }

    private validateToken(token: string){
        //----> Check if token is valid.
        if(!token){
            throw catchError(StatusCodes.UNAUTHORIZED, "Invalid token!");
        }

        //----> Validate token.
       const jwtPayload =  jwt.verify(token, process.env.JWT_TOKEN_KEY!) as JwtPayload;

        //----> Check if token is expired.
        if(!jwtPayload){
            throw catchError(StatusCodes.UNAUTHORIZED, "Invalid token!");
        }

        //----> Return tokenJwt.
       return this.fromJwtPayloadToTokenJwt(jwtPayload);
    }

    private generateToken(tokenJwt: TokenJwt, expiresIn: number){
        const token = jwt.sign(tokenJwt, process.env.JWT_TOKEN_KEY!, {expiresIn});

        //----> Check if token is valid.
        if(!token){
            throw catchError(StatusCodes.UNAUTHORIZED, "Invalid token!");
        }

        //----> Return token.
        return token;
    }

    private fromJwtPayloadToTokenJwt(payload: JwtPayload): TokenJwt{
        return{
            id: payload.id,
            name: payload.name,
            email: payload.email,
            role: payload.role,
        }
    }

    private fromUserToTokenJwt(payload: User): TokenJwt{
        return{
            id: payload.id,
            name: payload.name,
            email: payload.email,
            role: payload.role,
        }
    }

    private makeSession(tokenJwt: TokenJwt, accessToken: string): Session{
        return{
           ...tokenJwt,
            accessToken,
            isLoggedIn: !!tokenJwt,
            isAdmin: tokenJwt.role === Role.Admin,
        }
    }

    private makeTokenObject(userId: string, accessToken: string, refreshToken: string): TokenUncheckedCreateInput{
        return{
            accessToken,
            refreshToken,
            expired: false,
            revoked: false,
            tokenType: TokenType.Bearer,
            userId
        }
    }



    private async getCookie(cookieName: string): Promise<string>{
        //----> Initialize cookie.
        const cookieStore  = await cookies();
        const cookieValue = cookieStore.get(cookieName)?.value as string;

        //----> Check if cookie exists.
        if(!cookieValue){
            throw catchError(StatusCodes.UNAUTHORIZED, "Invalid token!");
        }

        //----> Send back the cookie-value.
        return cookieValue;

    }

    private async setCookie(cookieName: string, cookieValue: string, cookiePath: string, maxAge: number){
        //----> Initialize cookie.
        const cookieStore  = await cookies();
        cookieStore.set(cookieName, cookieValue, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: cookiePath,
            maxAge,
        });

    }

    private async deleteCookie(cookieName: string, cookiePath: string){
        const cookieStore  = await cookies();
        cookieStore.delete(cookieName);
        await this.setCookie(cookieName, "", cookiePath, 0);
    }

}

export const authService = new AuthService();
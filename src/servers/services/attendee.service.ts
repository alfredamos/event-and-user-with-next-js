import { Attendee } from "@/generated/prisma/client";
import { Status } from "@/generated/prisma/enums";
import { AttendeeUncheckedCreateInput } from "@/generated/prisma/models";
import {IAttendeeService} from "@/servers/services/iattendee.service";
import {AttendeeResponse, toAttendeeResponse} from "../dto/attendeeRequest.dto";
import {ResponseMessage} from "../utils/responseMessage.util";
import {validateWithZodSchema} from "@/servers/validations/zodSchema.validation";
import {attendeeSchema} from "@/servers/validations/attendee.validation";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {prisma} from "@/servers/db/prisma";
import {capitalizeFirstLetter} from "@/servers/utils/capitalizeFirstLetter.util";

class AttendeeService implements IAttendeeService {
    async createAttendee(request: AttendeeUncheckedCreateInput): Promise<AttendeeResponse> {
        //----> Validate inputs.
        if (!validateWithZodSchema(attendeeSchema, request)){
            throw catchError(StatusCodes.BAD_REQUEST, "Invalid attendee inputs!");
        }

        //----> Create attendee in a database.
        const attendee = await prisma.attendee.create({data: request, include: {event: true, user: true}});

        //----> Send back response.
        return toAttendeeResponse(attendee);
    }

    async deleteAttendeeById(eventId: string, userId: string): Promise<ResponseMessage> {
        //----> Check if attendee exists.
        await this.getOneAttendee(eventId, userId);

        //----> Delete attendee from a database.
        await prisma.attendee.delete({where: {eventId_userId: {eventId, userId}}});

        //----> Send back response.
        return new ResponseMessage("Attendee deleted successfully!", "success", StatusCodes.OK);
    }

    async editAttendeeById(eventId: string, userId: string, request: Attendee): Promise<ResponseMessage> {
        //----> Check if attendee exists.
        await this.getOneAttendee(eventId, userId);

        //----> Update attendee in a database.
        await prisma.attendee.update({where: {eventId_userId: {eventId, userId}}, data: {status: request.status}});

        //----> Send back response.
        return new ResponseMessage("Attendee updated successfully!", "success", StatusCodes.OK);
    }

    async getAttendeeById(eventId: string, userId: string): Promise<AttendeeResponse> {
        //----> Check if attendee exists.
        const attendee = await this.getOneAttendee(eventId, userId);

        //----> Send back response.
        return toAttendeeResponse(attendee);
    }

    async getAllAttendees(): Promise<AttendeeResponse[]> {
        //----> Fetch all attendees from a database.
        const attendees = await prisma.attendee.findMany({include: {event: true, user: true}});

        //----> Send back response.
        return attendees.map(toAttendeeResponse);
    }

    async getAttendeesByEventId(eventId: string): Promise<AttendeeResponse[]> {
        //----> Fetch all attendees from a database.
        const attendees = await prisma.attendee.findMany({where: {eventId}, include: {event: true, user: true}});

        //----> Send back response.
        return attendees.map(toAttendeeResponse)
    }

    async getAttendeesByUserId(userId: string): Promise<AttendeeResponse[]> {
        //----> Fetch all attendees from a database.
        const attendees = await prisma.attendee.findMany({where: {userId}, include: {event: true, user: true}});

        //----> Send back response.
        return attendees.map(toAttendeeResponse)
    }

    async getAttendeesByStatus(status: string): Promise<AttendeeResponse[]> {
        const statusString = capitalizeFirstLetter(status.toLowerCase());
        const attendeeStatus = statusString as Status;


        //----> Fetch all attendees from a database.
        const attendees = await prisma.attendee.findMany({where: {status: attendeeStatus}, include: {event: true, user: true}});

        //----> Send back response.
        return attendees.map(toAttendeeResponse)
    }

    private async getOneAttendee(eventId: string, userId: string) {
        //----> Fetch attende with event-id and user-id from a database.
        const attendee = await prisma.attendee.findUnique({where: {eventId_userId: {eventId, userId}}, include: {event: true, user: true}});

        //----> Check if attendee exists.
        if(!attendee) throw catchError(StatusCodes.NOT_FOUND, "Attendee not found!");

        //----> Send back attendee.
        return attendee;
    }

}

export const attendeeService = new AttendeeService();
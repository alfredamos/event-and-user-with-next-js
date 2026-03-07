import {AttendeeUncheckedCreateInput} from "@/generated/prisma/models/Attendee";
import {AttendeeResponse} from "@/servers/dto/attendeeRequest.dto";
import {Attendee} from "@/generated/prisma/client";
import {Status} from "@/generated/prisma/enums"
import {ResponseMessage} from "@/servers/utils/responseMessage.util";

export interface IAttendeeService {
    createAttendee(request: AttendeeUncheckedCreateInput): Promise<AttendeeResponse>;
    deleteAttendeeById(eventId: string, userId: string): Promise<ResponseMessage>;
    editAttendeeById(eventId: string, userId: string, request: Attendee): Promise<ResponseMessage>;
    getAttendeeById(eventId: string, userId: string): Promise<AttendeeResponse>;
    getAllAttendees(): Promise<AttendeeResponse[]>;
    getAttendeesByEventId(eventId: string): Promise<AttendeeResponse[]>;
    getAttendeesByUserId(userId: string): Promise<AttendeeResponse[]>;
    getAttendeesByStatus(status: Status): Promise<AttendeeResponse[]>;

}
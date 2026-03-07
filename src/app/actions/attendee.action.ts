"use server"

import {attendeeService} from "@/servers/services/attendee.service";
import {AttendeeUncheckedCreateInput} from "@/generated/prisma/models/Attendee";
import {Attendee} from "@/generated/prisma/client";

export async function createAttendeesAction(request: AttendeeUncheckedCreateInput){
    //----> Create a new attendee.
    try {
        return await attendeeService.createAttendee(request);
    }catch (error) {
        throw error
    }
}

export async function deleteAttendeesByIdAction(eventId: string, userId: string){
    //----> Delete an attendee by id.
    try {
        return await attendeeService.deleteAttendeeById(eventId, userId);
    }catch (error) {
        throw error
    }
}

export async function editAttendeesByIdAction(eventId: string, userId: string, request: Attendee){
    //----> Edit an attendee by id.
    try {
        return await attendeeService.editAttendeeById(eventId, userId, request);
    }catch (error) {
        throw error
    }
}

export async function getAllAttendeesAction(){
    //----> Get all attendees.
    try {
        return await attendeeService.getAllAttendees();
    }catch (error) {
        throw error
    }
}

export async function getAttendeesByIdAction(eventId: string, userId: string){
    //----> Get an attendee by id.
    try {
        return await attendeeService.getAttendeeById(eventId, userId);
    }catch (error) {
        throw error
    }
}

export async function getAttendeesByEventIdAction(eventId: string){
    //----> Get attendees by event id.
    try {
        return await attendeeService.getAttendeesByEventId(eventId);
    }catch (error) {
        throw error
    }
}

export async function getAttendeesByStatusAction(status: string){
    //----> Get attendees by status.
    try {
        return await attendeeService.getAttendeesByStatus(status);
    }catch (error) {
        throw error
    }
}

export async function getAllAttendeesByUserIdAction(userId: string){
    //----> Get attendees by user id.
    try {
        return await attendeeService.getAttendeesByUserId(userId);
    }catch (error) {
        throw error
    }
}
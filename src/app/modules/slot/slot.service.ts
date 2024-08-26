import httpStatus, { NOT_FOUND } from "http-status";
import AppError from "../../errors/AppError";
import { Service } from "../service/service.model";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";
import { formatMinutesToTime, parseTimeToMinutes } from "./slot.utils";

// Creates a new slot in the database
const createSlotIntoDB = async (payload: TSlot, duration: number) => {

  const { service, date, startTime, endTime } = payload;

    //Check if the slot is exit
  const isSlotsExist = await Slot.findOne({ service })
  if (isSlotsExist) {
    throw new AppError(httpStatus.CONFLICT, "Slots is already exist")
  }

  const isServiceExist = await Service.findById(service)
  
  //Check if the service is exit
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found")
  }

  if (startTime > endTime) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Start time must be before end time');
  }

  const startMinutes = parseTimeToMinutes(startTime);
  const endMinutes = parseTimeToMinutes(endTime);

  let time = startMinutes; time < endMinutes; time = duration
  const slot: TSlot = {
    service,
    date,
    startTime: formatMinutesToTime(time),
    endTime: formatMinutesToTime(time + duration),
    isBooked: 'available',
  };
  const createSlot = await Slot.create(slot);


  return createSlot;
};


const getAvailableSlots = async (serviceId: string, date: string) => {

  const slots = await Slot.find({ service: serviceId, date }).populate('service');
  return slots;
};


export const slotService = {
  createSlotIntoDB,
  getAvailableSlots
};

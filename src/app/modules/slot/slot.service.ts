/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
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

const getAllSlots = async (date?: string, serviceId?: string) => {
  // const filter: any = { isBooked: "available" };
  const filter: any = {};

  if (date) {
    filter.date = new Date(date);
  }

  if (serviceId) {
    filter.service = serviceId;
  }

  const slots = await Slot.find(filter).populate("service");
  return slots;
};

const getSingleSlot = async (id: string) => {
  try {
    const slot = await Slot.findById(id).populate("service");
    if (!slot) {
      throw new Error("Slot not found");
    }
    return slot;
  } catch (error) {
    console.error("Error retrieving slot:", error);
    throw error;
  }
};

const updateSlotStatus = async (id: string, status: string) => {
  const slot = await Slot.findById(id);
  
  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
  }

  // Check if the slot is already booked
  if (slot.isBooked === 'booked') {
    throw new AppError(httpStatus.BAD_REQUEST, "Cannot update a booked slot");
  }

  // Only allow status to be updated to 'available' or 'cancelled'
  if (status !== 'available' && status !== 'cancelled') {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid status update");
  }

  slot.isBooked = status;
  await slot.save();
  return slot;
};

export const slotService = {
  createSlotIntoDB,
  getAllSlots,
  updateSlotStatus,
  getSingleSlot,
};

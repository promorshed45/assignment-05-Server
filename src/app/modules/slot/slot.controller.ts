import catchAsync from '../../utils/catechAsync';
import sendResponse from '../../utils/sendResponse';
import { slotService } from './slot.service';
import httpStatus from 'http-status';

const createSlot = catchAsync(async (req, res) => {

  const duration = 60;
  const serviceData = req.body;

  const result = await slotService.createSlotIntoDB(serviceData, duration);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots created successfully",
    data: result,
  });

});


const getAllSlots = catchAsync(async (req, res) => {
  const { date, serviceId } = req.query;
  const result = await slotService.getAllSlots(
    date as string,
    serviceId as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});

const getSingleSlot = catchAsync(async (req, res) => {
  const { slotId } = req.params;
  const result = await slotService.getSingleSlot(slotId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});


const updateSlotStatus = catchAsync(async (req, res) => {
  const { slotId } = req.params;
  const { isBooked } = req.body;

  const result = await slotService.updateSlotStatus(slotId, isBooked);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot status updated successfully",
    data: result,
  });
});

export const slotControllers = {
  createSlot,
  getAllSlots,
  updateSlotStatus,
  getSingleSlot
};
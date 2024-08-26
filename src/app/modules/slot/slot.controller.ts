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


const getAvailableSlots = catchAsync(async (req, res) => {

  const { date, serviceId } = req.query;

  if (!date || !serviceId) {
    res.status(400).json({ success: false, message: 'Date and serviceId are required' });
    return;
  }

  const result = await slotService.getAvailableSlots(serviceId as string, date as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available slots retrieved successfully',
    data: result,
  });
});


export const slotControllers = {
  createSlot,
  getAvailableSlots
};
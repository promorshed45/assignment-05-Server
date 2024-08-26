import { Request, Response } from 'express';
import catchAsync from '../../utils/catechAsync';
import { serviceService } from './service.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.createServiceIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message:"Service created successfully",
    data: result,
  });
});

const getService = catchAsync(async (req: Request, res: Response) => {
  const serviceId = req.params.id;
  const result = await serviceService.getServiceById(serviceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service retrieved successfully",
    data: result,
  });
});


const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.getAllServices();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Services retrieved successfully",
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const serviceId = req.params.id;
  const result = await serviceService.updateService(serviceId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});

const softDeleteService = catchAsync(async (req: Request, res: Response) => {
  const serviceId = req.params.id;
  const result = await serviceService.softDeleteService(serviceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
});



export const serviceControllers = {
    createService,
    getService,
    getAllServices,
    updateService,
    softDeleteService
  };

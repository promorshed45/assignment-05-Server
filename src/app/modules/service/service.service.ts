import { TService } from "./service.interface";
import { Service } from "./service.model";


// Creates a new service in the database
const createServiceIntoDB = async (payload: TService) => {
  const existingService = await Service.findOne({ name: new RegExp(`^${payload.name}$`, 'i') });
  if (existingService) {
    throw new Error(`${payload.name} service already exists`);
  }
  const newService = await Service.create(payload);
  return newService;
};

// Get a service by ID
const getServiceById = async (id: string) => {
  const service = await Service.findById(id);
  if (!service || service.isDeleted) {
    throw new Error("Service not found or deleted");
}
  return service;
};

// Get all services
const getAllServices = async () => {
  const service = await Service.find({isDeleted: false});
  if (!service) {
    throw new Error("No Data Found",);
  }
  return service;
};

const updateService = async (id: string, payload: Partial<TService>) => {
  const service = await Service.findByIdAndUpdate(id, payload, { new: true });
  if (!service) {
    throw new Error('Service not found');
  }
  return service;
};


const softDeleteService = async (id: string) => {
  const service = await Service.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  if (!service) {
    throw new Error('Service not found');
  }
  return service;
};


export const serviceService = {
    createServiceIntoDB,
    getServiceById,
    getAllServices,
    updateService,
    softDeleteService
  };

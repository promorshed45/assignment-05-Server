import express from "express";
import { serviceControllers } from "./service.controller";
import { slotControllers } from "../slot/slot.controller";
import { auth } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { ServiceValidations } from "./service.validation";
import { SlotValidations } from "../slot/slot.validation";

const router = express.Router();

router.post(
  "/",
  auth("admin"),
  validateRequest(ServiceValidations.createServiceValidation),
  serviceControllers.createService
);
router.get(
  "/:id",
  serviceControllers.getService
);
router.get(
  "/",
  serviceControllers.getAllServices
);
router.put(
  "/:id",
  auth("admin"),
  validateRequest(ServiceValidations.updateServiceValidation),
  serviceControllers.updateService
);
router.delete(
  "/:id",
  auth("admin"),
  serviceControllers.softDeleteService
);

router.post(
  "/slots",
  auth("admin"),
  validateRequest(SlotValidations.createSlotValidation),
  slotControllers.createSlot
);





export const ServiceRoute = router;


import express from "express";
import { slotControllers } from "./slot.controller";

const router = express.Router();

router.get(
    "/availability",
    slotControllers.getAllSlots
  );
  router.get(
    "/availability/:slotId", 
    slotControllers.getSingleSlot);
  
  router.patch(
    "/:slotId",
    // auth(USER_ROLE.admin),
    slotControllers.updateSlotStatus
  );


export const SlotRoute = router;


import { Slot } from "../slot/slot.model";
import { verifyPayment } from "./payment.utilis";

const confirmationService = async (transactionId: string) => {
    const verifyResponse = await verifyPayment(transactionId);
    console.log(verifyResponse);

  const result = await Slot.findOneAndUpdate(
    { transactionId },
    {
      isBooked: "booked",
    },
    { new: true }
  );

  return result;
};

export const paymentServices = {
  confirmationService,
};

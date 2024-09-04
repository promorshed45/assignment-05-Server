/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "../../config";

export const initiatePayment = async (paymentData: any) => {
  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: paymentData.transactionId,
      success_url: `http://localhost:5000/api/payment/confirmation?transactionId=${paymentData.transactionId}`,
      // success_url: `https://car-wash-booking-system-servcer.vercel.app/api/payment/confirmation`,
      // fail_url: `https://car-wash-booking-system-client.vercel.app/`,
      // cancel_url: "https://car-wash-booking-system-client.vercel.app/",
      amount: paymentData.totalPrice,
      currency: "BDT",
      desc: "Merchant Registration Payment",
      cus_name: paymentData.customerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_phone: paymentData.customerPhone,
      type: "json",
    });

    // Log the response from the payment initiation API
    // return response.data;
    console.log("API Response:", response.data);
  } catch (err) {
    console.log(err);
    throw new Error("Payment initiation failed!");
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(process.env.PAYMENT_VERIFY_URL!, {
      params: {
        store_id: process.env.STORE_ID,
        signature_key: process.env.SIGNATURE_KEY,
        type: "json",
        request_id: tnxId,
      },
    });

    return response.data;
  } catch (err) {
    console.log(err)
    throw new Error("Payment validation failed!");
  }
};

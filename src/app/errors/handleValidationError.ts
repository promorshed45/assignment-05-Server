import mongoose from "mongoose";
import { ZodError, ZodIssue, object } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";



const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
      
    const errorSources: TErrorSources = Object.values(err.errors).map((value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {

        return {
            path: value?.path,
            message: value?.message
        }
    })
    
   
    const statusCode = 400;

    return {
      statusCode,
      message: 'Mongoose Validation Error',
      errorSources,
    }
  }
 

export default handleValidationError;
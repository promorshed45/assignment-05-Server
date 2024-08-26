import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any) : TGenericErrorResponse => {
   //Extract value within double quotes using regex
    const match = err.message.match(/"([^"]*)"/);

    //The extracated message will be in the first capturing group
    const extractedMsg = match && match[1];

    const errorSources: TErrorSources = [
        {
            path: '',
            message: `${extractedMsg} is already exists`,
        }
    ]
    const statusCode = 400;

    return {
      statusCode,
      message: 'Duplicate name error',
      errorSources,
    }
}

export default handleDuplicateError;
import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter{
    catch(error: Error, host: ArgumentsHost) {

        const response = host.switchToHttp().getResponse();
    
        const status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    
        response
          .status(status)
          .json(error);
    }


}
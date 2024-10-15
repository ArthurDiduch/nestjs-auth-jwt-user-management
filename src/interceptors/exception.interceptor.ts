import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ExceptionInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        // Log o erro detalhado
        this.logger.error(
          `Erro no contexto de ${context.getClass().name}: ${error.message}`,
          error.stack,
        );

        // Retorna um erro genérico ao cliente
        return throwError(
          () =>
            new InternalServerErrorException(
              'Internal server error. Please try again later.',
            ),
        );
      }),
    );
  }
}

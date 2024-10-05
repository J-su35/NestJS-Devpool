import { Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoggedInDto } from './dto/logged-in.dto';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
import { PerfLoggerInterceptor } from 'src/interceptors/perf-logger.interceptor';

@UseInterceptors(PerfLoggerInterceptor) //last day
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  // Original Code
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // login(@Request() request: { user: LoggedInDto}) {
  //   const access_token = this.authService.login(request.user)
  //   return { access_token  };
  // }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() request: { user : LoggedInDto }) {
    return this.authService.login(request.user);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  refreshToken(@Request() request: { user : LoggedInDto }) {
    return this.authService.refreshToken(request.user);
  }
}

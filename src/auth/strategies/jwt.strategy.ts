import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { LoggedInDto } from '../dto/logged-in.dto';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    validate(payload: LoggedInDto): LoggedInDto {
        return payload
    }
}


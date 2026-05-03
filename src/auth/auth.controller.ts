import { Controller, Get, Post, Body, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { RawHeaders, GetUser } from './decorators';
import type { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces';
import { RoleProtected } from './decorators/role-protected.decorator';
import { Auth } from './decorators/auth.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }



  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login( loginUserDto );
  }


@Get('private')
@UseGuards( AuthGuard() )
testingPrivateRoute(
  @Req() request: Express.Request,
  @GetUser() user: User,
  @GetUser('email') userEmail: string,

  @RawHeaders() rawHeaders: string[],
  @Headers() headers: IncomingHttpHeaders,

){

  console.log({user: request.user});

  return {
    ok: true,
    message: 'Hola mundo Private',
    user,
    userEmail,
    rawHeaders,
    headers
  }

}


// @SetMetadata('roles',['admin', 'super-user'])
// @Get('private2')
// @RoleProtected(ValidRoles.superUser, ValidRoles.admin, ValidRoles.user)
// @UseGuards( AuthGuard(),    )
// privateRoute2(
//   @GetUser() user: User
// ) {

//   return {
//     ok:true,
//     user
//   }

// }



@Get('private3')
@Auth( ValidRoles.admin )
privateRoute3(
  @GetUser() user: User
) {

  return {
    ok:true,
    user
  }

}



}

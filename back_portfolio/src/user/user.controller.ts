import { Controller, Body, HttpException, Post, Get, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiBadRequestResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { UserRO } from './user.interface';
import { UserService } from './user.service';
import { resetPasswordDto } from './dto/update-user.dto';



@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}


    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiCreatedResponse({ description: 'Listing all users successfully !'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    async getAll() {
      return this.userService.findAll();
    }
    
    @Post()
    @ApiOperation({ summary: 'Create a user' })
    @ApiCreatedResponse({ description: 'User created successfully !'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    async create(@Body() userData: CreateUserDto) {
      return this.userService.create(userData);
    }

    @Get(':email')
    @ApiOperation({ summary: 'Get a user with his/her email address' })
    @ApiOkResponse({ description: 'A user has been found with this email !'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    async findMe(@Param('email') userEmail: string): Promise<UpdateUserDto> {
      return await this.userService.findByEmail(userEmail);
    }

    @Post('login')
    @ApiOperation({ summary: 'Log a user' })
    @ApiOkResponse({ description: 'You\'re logged Now !'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
      const _user = await this.userService.findOneToLogin(loginUserDto);
  
      const errors = {User: ' not found'};
      if (!_user) throw new HttpException({errors}, 401);
  
      const token = this.userService.generateJwt(_user)
      const {email, username, avatar} = _user;
      const user = {email, token, username, avatar};
      return {user};
    }


    @Delete(':email')
    @ApiOperation({ summary: 'Delete a user' })
    async delete(@Param('email') email: string) {
        return await this.userService.delete(email);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a user' })
    @ApiOkResponse({ description: 'User updated successfullly !'})
    @ApiBadRequestResponse({ description: 'Something went wrong ...'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    async update(@Param('id') userId: number,@Body() userData: UpdateUserDto) {
        return await this.userService.update(userId, userData);
    }

     
    @Put('resetPass/:id')
    @ApiOperation({ summary: 'Reset the password of a user' })
    async resetPassword(@Param('id') id: number, @Body() userData: resetPasswordDto) {
        return await this.userService.resetPassword(id, userData);
    }
}

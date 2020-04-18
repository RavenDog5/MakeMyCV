import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {

  @ApiProperty({
    type: String,
    description: 'The user\'s email',
    default: 'acme'
  })
  readonly email: string;

  @ApiProperty({
    type: String,
    description: 'The user\'s password',
    default: 'myPassword'
  })
  readonly password: string;
}
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {

  @ApiProperty({
    type: String,
    description: 'The user\'s username',
    default: 'acme'
  })
  readonly username: string;

  @ApiProperty({
    type: String,
    description: 'The user\'s email',
    default: 'acme@hello.com'
  })
  readonly email: string;

  @ApiProperty({
    type: String,
    description: 'The user\'s address',
    default: '1 Chapel Hill Heswall Bournemouth BH1 1AA'
  })
  readonly address: string;

  @ApiProperty({
    type: String,
    description: 'The user\'s avatar',
    default: '<pathToMyAvatar>'
  })
  readonly avatar: string;

  @ApiProperty({
    type: String,
    description: 'The user\'s phone number'
  })
  readonly phone: string;
}

export class resetPasswordDto {
  @ApiProperty({
    type: String,
    description: 'The user\'s password',
    default: 'imblue'
  })
  readonly password: string;
}
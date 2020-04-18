import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Le pseudo de l\'utilisateur',
    default: ''
  })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    type: String,
    description: 'L\'email de l\'utilisateur',
    default: 'test@example.com'
  })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    type: String,
    description: 'Le mot de passe de l\'utilisateur',
    default: 'monchienestuncretin'
  })
  @IsNotEmpty()
  readonly password: string;
}
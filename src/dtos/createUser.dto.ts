import { Injectable } from '@nestjs/common';
import { PickType, ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';
import { Role } from '../decorators/roles.enum';

@Injectable()
export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user.',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  name: string;

  @ApiProperty({
    description: 'Email address of the user.',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Password for the user account. Must include uppercase, lowercase, number, and special character, and be between 8-15 characters.',
    example: 'Str0ngP@ssword',
  })
  @IsString()
  @IsStrongPassword()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'Password must include uppercase, lowercase, number, and special character, and be between 8-15 characters.',
  })
  password: string;

  @ApiProperty({
    description:
      'Confirmation of the password. It must match the password exactly.',
    example: 'Str0ngP@ssword',
  })
  @IsString()
  @ValidateIf((o) => o.password === o.confirmPassword)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message: 'Passwords do not match.',
  })
  confirmPassword: string;

  @ApiHideProperty()
  @IsEmpty()
  role?: Role;

  @ApiProperty({
    description: 'Residential address of the user.',
    example: '123 Main St, Apt 4B',
  })
  @IsString()
  @Length(3, 80)
  address: string;

  @ApiProperty({
    description: 'Phone number of the user.',
    example: 1234567890,
  })
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @ApiProperty({
    description: 'Country where the user resides.',
    example: 'United States',
  })
  @IsString()
  @Length(5, 20)
  country: string;

  @ApiProperty({
    description: 'City where the user resides.',
    example: 'New York',
  })
  @IsString()
  @Length(5, 20)
  city: string;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}

export class UpdateUserDto extends PickType(CreateUserDto, [
  'name',
  'email',
  'password',
  'address',
  'city',
  'country',
  'phone',
]) {}

export class MakeAdminDto extends PickType(CreateUserDto, ['password']) {}

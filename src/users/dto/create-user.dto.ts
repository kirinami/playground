import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @Length(8, 32)
  password!: string;

  @Length(2, 32)
  firstName!: string;

  @Length(2, 32)
  lastName!: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true || value === 1 || value === '1')
  active?: boolean;
}

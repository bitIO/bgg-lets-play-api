import { IsOptional, IsString, MinLength } from 'class-validator';

export class NonBggUser {
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}

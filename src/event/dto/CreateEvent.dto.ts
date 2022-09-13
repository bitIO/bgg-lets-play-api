import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { NonBggUser } from './NonBggUser';

export class CreateEventDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  location: string;

  @Type(() => {
    return Date;
  })
  @IsDate()
  startsAt: Date;

  @IsOptional()
  coordinates?: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @Type(() => {
    return Date;
  })
  @IsDate()
  endsAt: Date;

  @IsArray()
  bggUsers: string[];

  @IsArray()
  @Type(() => {
    return NonBggUser;
  })
  @ValidateNested({
    each: true,
  })
  nonBggUsers: NonBggUser[];
}

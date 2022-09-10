import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

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
}

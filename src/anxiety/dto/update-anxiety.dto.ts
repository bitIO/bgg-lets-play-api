import { PartialType } from '@nestjs/swagger';
import { CreateAnxietyDto } from './create-anxiety.dto';

export class UpdateAnxietyDto extends PartialType(CreateAnxietyDto) {}

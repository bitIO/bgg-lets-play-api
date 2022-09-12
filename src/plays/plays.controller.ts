import { Controller } from '@nestjs/common';
import { PlaysService } from './plays.service';

@Controller('plays')
export class PlaysController {
  constructor(private readonly playsService: PlaysService) {}
}

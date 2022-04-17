import { CreateBirdInput } from './create-bird.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBirdInput extends PartialType(CreateBirdInput) {
  id: number;
}

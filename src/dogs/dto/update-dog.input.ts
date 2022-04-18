import { CreateDogInput } from './create-dog.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDogInput extends PartialType(CreateDogInput) {
  id: number;
}

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DogsService } from './dogs.service';
import { CreateDogInput } from './dto/create-dog.input';
import { UpdateDogInput } from './dto/update-dog.input';

@Resolver('Dog')
export class DogsResolver {
  constructor(private readonly dogsService: DogsService) {}

  @Mutation('createDog')
  create(@Args('createDogInput') createDogInput) {
    console.log(createDogInput)
    return this.dogsService.create(createDogInput);
  }

  @Query('dogs')
  findAll() {
    return this.dogsService.findAll();
  }

  @Query('dog')
  findOne(@Args('id') id: number) {
    return this.dogsService.findOne(id);
  }

  @Mutation('removeDog')
  remove(@Args('id') id: number) {
    return this.dogsService.remove(id);
  }
}

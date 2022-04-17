import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BirdService } from './bird.service';
import { CreateBirdInput } from './dto/create-bird.input';
import { UpdateBirdInput } from './dto/update-bird.input';

@Resolver('Bird')
export class BirdResolver {
  constructor(private readonly birdService: BirdService) {}

  @Mutation('createBird')
  create(@Args('createBirdInput') createBirdInput: CreateBirdInput) {
    return this.birdService.create(createBirdInput);
  }

  @Query('bird')
  findAll() {
    return this.birdService.findAll();
  }

  @Query('bird')
  findOne(@Args('id') id: number) {
    return this.birdService.findOne(id);
  }

  @Mutation('updateBird')
  update(@Args('updateBirdInput') updateBirdInput: UpdateBirdInput) {
    return this.birdService.update(updateBirdInput.id, updateBirdInput);
  }

  @Mutation('removeBird')
  remove(@Args('id') id: number) {
    return this.birdService.remove(id);
  }
}

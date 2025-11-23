import { CreateBookInput } from './create-book.input';
import { InputType, Field, ID, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => ID)
  _id: string;
}

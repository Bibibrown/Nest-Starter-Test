import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Schema as MongooSchema } from 'mongoose';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;
}

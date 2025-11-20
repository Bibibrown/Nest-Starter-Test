import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';
import { Model, Schema as MongooSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  createUser(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  findAll() {
    return [];
  }

  getUserById(id: MongooSchema.Types.ObjectId) {
    return this.userModel.findById(id);
  }

  updateUser(
    id: MongooSchema.Types.ObjectId, 
    updateUserInput: UpdateUserInput
  ) {
    return this.userModel.findByIdAndUpdate(id, updateUserInput, { new: true });
  }

  remove(id: MongooSchema.Types.ObjectId): Promise<any> {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}

import { UserModel } from '../../models/user.model';

export const userResolvers = {
  Query: {
    users: async () => {
      return await UserModel.find();
    },
    user: async (_: any, { id }: { id: string }) => {
      return await UserModel.findById(id);
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { name, email }: { name: string; email: string },
    ) => {
      const newUser = new UserModel({ name, email });
      return await newUser.save();
    },
    updateUser: async (
      _: any,
      { id, name, email }: { id: string; name: string; email: string },
    ) => {
      return await UserModel.findByIdAndUpdate(
        id,
        { name, email },
        { new: true },
      );
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      await UserModel.findByIdAndDelete(id);
      return `User with ID ${id} deleted`;
    },
  },
};

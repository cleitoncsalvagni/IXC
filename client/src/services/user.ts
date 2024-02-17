import api from "./api";

export const getAllUsers = async () => {
  try {
    const response = await api.get<GenericRequest<PotentialChat[]>>(
      `findAllUsers`
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const findUser = async ({ recipientId }: { recipientId?: string }) => {
  try {
    if (!recipientId) return;

    const response = await api.get<GenericRequest<User>>(`find/${recipientId}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

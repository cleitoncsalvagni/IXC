import api from "./api";

export const getUserChat = async ({ id }: { id: string }) => {
  try {
    const response = await api.get<GenericRequest<Chat[]>>(`chat/${id}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const findChat = async ({ recipientId }: { recipientId?: string }) => {
  try {
    if (!recipientId) return;

    const response = await api.get<GenericRequest<Chat>>(
      `chat/find/${recipientId}`
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

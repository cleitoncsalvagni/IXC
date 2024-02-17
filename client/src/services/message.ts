import api from "./api";

export const getMessages = async (chatId?: string) => {
  try {
    const response = await api.get<GenericRequest<Message[]>>(
      `message/${chatId}`
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

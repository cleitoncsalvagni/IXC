import api from "./api";

export const createMessage = async (data: {
  chatId?: string;
  senderId?: string;
  text: string;
}) => {
  try {
    const response = await api.post("message", data);

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

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

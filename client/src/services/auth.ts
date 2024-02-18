import api from "./api";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post<GenericRequest<User>>("login", {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post<GenericRequest<User>>("register", {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

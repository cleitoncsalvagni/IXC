interface GenericRequest<T> {
  error: boolean;
  message: string;
  user?: T;
  users?: T;
  chat?: T;
  chats?: T;
  result?: T;
}

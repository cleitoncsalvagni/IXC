interface GenericRequest<T> {
  error: boolean;
  message: string;
  user?: T;
}

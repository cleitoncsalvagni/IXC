import * as Yup from "yup";

const DEFAULT_AUTH_SCHEMA = {
  email: Yup.string()
    .email("E-mail inválido")
    .required("E-mail precisa ser preenchido"),
  password: Yup.string()
    .required("Senha precisa ser preenchida")
    .min(3, "A senha precisa conter no minímo 3 caracteres"),
};

export const LOGIN_SCHEMA = Yup.object().shape({
  ...DEFAULT_AUTH_SCHEMA,
});

export const REGISTER_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .required("Nome precisa ser preenchido")
    .min(3, "Nome precisa conter no minímo 3 caracteres"),
  ...DEFAULT_AUTH_SCHEMA,
});

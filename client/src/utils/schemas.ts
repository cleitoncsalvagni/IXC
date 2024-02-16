import * as Yup from "yup";

export const AUTH_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("E-mail precisa ser preenchido"),
  password: Yup.string()
    .min(8, "A senha precisa conter no minímo 8 caracteres")
    .required("Senha precisa ser preenchida"),
});

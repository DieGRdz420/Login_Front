
// export interface User {
//   id: number;
//   nombre?: string;
//   email?: string;
//   admin?: number;
//   // message?: string;
// }

export interface User {
  error?: boolean;
  status?: number;
  body?: {
      id: number;
      usuario?: string;
      email?: string;
      contrasena?: string;
      rol_usuario?: number;
      token?: string;
    }
}

export interface NewUser {
  id: number;
  nombre: string;
  email: string;
  contrasena: string;
  id_rol: number;
}


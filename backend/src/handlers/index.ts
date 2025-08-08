import { Response, Request } from "express";
import { check, validationResult } from "express-validator";
import slug from "slug";
import User from "../models/user";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export const createAccount = async (req: Request, res: Response) => {
  // declaraciones y validaciones para email
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("Un usario ya esta registrado con ese email");
    return res.status(409).json({ error: error.message });
  }

  // declaraciones y validacion para el handle del usuario
  const handle = slug(req.body.handle);
  const handleExist = await User.findOne({ handle });

  if (handleExist) {
    const error = new Error("Un usuario ya tiene ese nombre");
    return res.status(409).json({ error: error.message });
  }

  // Guardado de usuario, contraseña, handle en base de datos
  const user = new User(req.body);
  user.password = await hashPassword(password);
  user.handle = handle;
  await user.save();
  res.status(201).send("Registro completado con exito");
};

export const login = async (req: Request, res: Response) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erorrs: errors.array() });
  }

  // comprobar el usuario

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("El usuario no existe o no esta registrado");
    return res.status(401).json({ error: error.message });
  }
  console.log("Si existe....");

  // comprobar el password
  console.log(password, user.password);
  const isPasswordCorrect = await checkPassword(password, user.password);
  if (!isPasswordCorrect) {
    const error = new Error("Contraseña incorrecta");
    return res.status(401).json({ error: error.message });
  }

  const token = generateJWT({ id: user._id });

  res.send(token);
};

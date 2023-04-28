import { prisma } from "../../../../lib/prisma";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
    username: string,
    password: string
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        // valida se usuario existe
        const client = await prisma.client.findFirst({
            where: {
                username
            }
        })

        if (!client) throw new Error("Invalid user or password!");

        // validar se a senha está correta
        const correctPassword = await compare(password, client.password)

        if (!correctPassword) throw new Error("Invalid user or password!");

        // gerar o token
        const token = sign({ username }, "1fcd72aa32528809bb82802ce33b5061", {
            subject: client.id,
            expiresIn: "1d"
        });

        return token;
    }
}
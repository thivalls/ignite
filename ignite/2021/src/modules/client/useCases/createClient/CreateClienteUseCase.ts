import { prisma } from "../../../../lib/prisma";
import { hash } from "bcrypt";

interface ICreateClient {
    username: string,
    password: string
}

export class CreateClientUseCase {
    async execute({ username, password }: ICreateClient) {
        // validar se cliente já existe
        const clientExist = await prisma.client.findFirst({
            where: {
                username: {
                    contains: username, mode: 'insensitive'
                }
            }
        })

        if (clientExist) throw new Error("Client already exists");

        // criptografar senha
        const criptPassword = await hash(password, 10)

        // criar cliente
        const client = await prisma.client.create({
            data: {
                username,
                password: criptPassword
            }
        })

        return client;
    }
}
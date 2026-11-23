import { prisma } from "../config/database.js";

export async function getAllEvents() {
    return prisma.event.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            _count: {
                select: {
                    draws: true,
                },
            },
        },
    });
}

export async function createEvent(name: string) {
    return prisma.event.create({
        data: {
            name,
        },
    });
}
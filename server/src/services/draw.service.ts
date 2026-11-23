import { prisma } from "../config/database.js";

export async function getDrawsForEvent(eventId: string) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { id: true },
  });

  if (!event) {
    return null;
  }

  return prisma.draw.findMany({
    where: { eventId },
    orderBy: { createdAt: "desc" },
  });
}

export async function createDraw(eventId: string, name?: string) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { id: true },
  });

  if (!event) {
    return null;
  }

  return prisma.draw.create({
    data: {
      eventId,
      name,
    },
  });
}

export async function getDrawById(drawId: string) {
  return prisma.draw.findUnique({
    where: { id: drawId },
  });
}
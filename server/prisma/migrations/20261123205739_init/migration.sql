-- CreateEnum
CREATE TYPE "DrawStatus" AS ENUM ('DRAFT', 'COMPLETED');

-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Draw" (
    "id" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "name" TEXT,
    "status" "DrawStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Draw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" UUID NOT NULL,
    "drawId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exclusion" (
    "id" UUID NOT NULL,
    "drawId" UUID NOT NULL,
    "giverId" UUID NOT NULL,
    "excludedParticipantId" UUID NOT NULL,

    CONSTRAINT "Exclusion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" UUID NOT NULL,
    "drawId" UUID NOT NULL,
    "giverId" UUID NOT NULL,
    "receiverId" UUID NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Draw_eventId_idx" ON "Draw"("eventId");

-- CreateIndex
CREATE INDEX "Participant_drawId_idx" ON "Participant"("drawId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_drawId_id_key" ON "Participant"("drawId", "id");

-- CreateIndex
CREATE INDEX "Exclusion_drawId_idx" ON "Exclusion"("drawId");

-- CreateIndex
CREATE UNIQUE INDEX "Exclusion_drawId_giverId_excludedParticipantId_key" ON "Exclusion"("drawId", "giverId", "excludedParticipantId");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_drawId_giverId_key" ON "Assignment"("drawId", "giverId");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_drawId_receiverId_key" ON "Assignment"("drawId", "receiverId");

-- AddForeignKey
ALTER TABLE "Draw" ADD CONSTRAINT "Draw_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "Draw"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exclusion" ADD CONSTRAINT "Exclusion_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "Draw"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exclusion" ADD CONSTRAINT "Exclusion_drawId_giverId_fkey" FOREIGN KEY ("drawId", "giverId") REFERENCES "Participant"("drawId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exclusion" ADD CONSTRAINT "Exclusion_drawId_excludedParticipantId_fkey" FOREIGN KEY ("drawId", "excludedParticipantId") REFERENCES "Participant"("drawId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "Draw"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_drawId_giverId_fkey" FOREIGN KEY ("drawId", "giverId") REFERENCES "Participant"("drawId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_drawId_receiverId_fkey" FOREIGN KEY ("drawId", "receiverId") REFERENCES "Participant"("drawId", "id") ON DELETE CASCADE ON UPDATE CASCADE;

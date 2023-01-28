-- CreateTable
CREATE TABLE "transporters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "transporters_name_key" ON "transporters"("name");

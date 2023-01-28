-- CreateTable
CREATE TABLE "deliveries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_client" TEXT NOT NULL,
    "id_transporter" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "end_at" DATETIME NOT NULL,
    CONSTRAINT "deliveries_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "deliveries_id_transporter_fkey" FOREIGN KEY ("id_transporter") REFERENCES "transporters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

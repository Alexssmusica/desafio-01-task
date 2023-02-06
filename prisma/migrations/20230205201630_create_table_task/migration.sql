-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completed_at" DATETIME,
    "updated_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL
);

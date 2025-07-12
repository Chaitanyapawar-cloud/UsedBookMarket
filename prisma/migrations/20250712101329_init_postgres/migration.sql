-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "bookName" TEXT NOT NULL,
    "bookType" TEXT NOT NULL,
    "publicationYear" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "publication" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

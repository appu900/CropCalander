-- AlterTable
ALTER TABLE "AgriExpert" ADD COLUMN     "profilePic" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'AGRI_EXPERT';

-- AlterTable
ALTER TABLE "Farmer" ADD COLUMN     "profilePic" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'FARMER';

-- AlterTable
ALTER TABLE "FarmerCropCalendarActivity" ADD COLUMN     "image" TEXT;

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "postedBy" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "agriexpertId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_postedBy_fkey" FOREIGN KEY ("postedBy") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_agriexpertId_fkey" FOREIGN KEY ("agriexpertId") REFERENCES "AgriExpert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

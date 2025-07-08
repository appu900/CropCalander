-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "star" INTEGER,
    "feedbackCategory" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

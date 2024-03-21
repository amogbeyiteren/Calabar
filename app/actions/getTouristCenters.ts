import prisma from "@/app/libs/prismadb";

export default async function getTouristCenters() {
  try {
    const touristCenters = await prisma.touristCenter.findMany({
      // Optionally add filters or select specific fields here
    });

    return touristCenters;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching tourist centers");
  }
}

import prisma from "@/app/libs/prismadb";

export default async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      // Optionally add filters or select specific fields here
    });

    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching users");
  }
}

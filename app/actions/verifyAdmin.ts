import { getSession } from "next-auth/react"; // Change to "next-auth/next" for server-side
import prisma from "@/app/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function verifyAdmin(request:any) {
  try {
    const session = await getSession({ req: request }); // Access session from request object

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    // Check if user has admin role based on your schema definition
    if (currentUser.role !== "ADMIN") {
      return null;
    }

    return currentUser; // Return user object if admin
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

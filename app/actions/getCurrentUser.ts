import Prisma from '@/app/libs/prismadb'
import getSession from './getSession'

const getCurrentUser = async () => {
  try {
    const session = await getSession()
    if (!session?.user) {
      return null
    }
    const currentUser = await Prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })
    if (!currentUser) {
      return null
    }
    return currentUser
  } catch (error) {
    return null
  }
}
export default getCurrentUser
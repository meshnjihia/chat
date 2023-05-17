import getCurrentUser from "@app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

type IParams = {
    conversationId?: string
}

export async function POST(
    request: Request,
    {params}: {params: IParams}
) {
    try {

        const currentUser = await getCurrentUser()
        const { conversationId } = params

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse('unauthorized', { status: 401 })
        }

        // find existing conversation
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true,
                    }
                },
                users: true,
            }
        });

        if(!conversation) {
            return new NextResponse('Invalid ID', { status: 400 })
        }

        // find last message
        const lastMessage = conversation.messages[conversation.messages.length - 1]

        if(!lastMessage?.seen) {
            return  NextResponse.json(conversation)
        }

        // update last message seen
        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true,
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        })

        return NextResponse.json(updatedMessage)
        
    } catch (error:any) {
        console.log(error, 'error messages seen');
        return new NextResponse('internal server error', { status: 500 });
    }
}
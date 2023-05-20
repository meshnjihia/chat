import Sidebar from "@app/components/sidebar/Sidebar"
import ConversationList from "./components/ConversationList"
import getConversations from "@app/actions/getConversations"
import getUsers from "@app/actions/getUsers"

export default async function ConversationLayout({
    children,
}: {
    children: React.ReactNode
    }) {
    const conversations = await getConversations();
    const users = await getUsers();

    return (
        // @ts-expect-error Server Component
        <Sidebar>
            <div className="h-full">
                <ConversationList
                    users={users}
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    )
}
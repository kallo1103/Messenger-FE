'use client';

import { useChatStore } from '@/store/useChatStore';
import ChatWindow from '@/components/chat/ChatWindow';
import { cn } from '@/lib/utils'; // Make sure this is available

export default function Home() {
  const { activeConversationId, setActiveConversation } = useChatStore();

  return (
    <main className="flex h-screen overflow-hidden bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-sans">
      
      {/* Left Sidebar - Chat List */}
      <aside className={cn(
        "flex-col w-full md:w-80 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-black",
        activeConversationId ? "hidden md:flex" : "flex"
      )}>
        <div className="p-4 h-16 flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 flex-shrink-0">
           <h1 className="text-xl font-bold tracking-tight">Chats</h1>
           <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-800"></div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
           {/* Skeleton Items for Demo */}
           {Array.from({ length: 5 }).map((_, i) => (
             <div 
                key={i} 
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-900 cursor-pointer transition"
                onClick={() => setActiveConversation(`chat-${i}`)}
             >
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-zinc-800 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                   <div className="w-32 h-4 bg-gray-200 dark:bg-zinc-800 rounded mb-2" />
                   <div className="w-20 h-3 bg-gray-100 dark:bg-zinc-900 rounded" />
                </div>
             </div>
           ))}
        </div>
      </aside>

      {/* Middle - Chat Window */}
      <section className={cn(
        "flex-1 min-w-0 relative flex flex-col",
        activeConversationId ? "flex" : "hidden md:flex"
      )}>
        {activeConversationId ? (
            <ChatWindow />
        ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
                <p>Select a chat to start messaging</p>
            </div>
        )}
      </section>

      {/* Right Sidebar - Details */}
      <aside className={cn(
          "w-80 border-l border-gray-200 dark:border-zinc-800 bg-white dark:bg-black hidden lg:flex flex-col",
          // On small screens, this is hidden by 'hidden lg:flex'. On specific state we might want to toggle it, 
          // but for now keeping 3-column strictly for large screens.
          !activeConversationId && "lg:hidden xl:flex" // Optional: Hide details if no chat selected? usually details is valid only if chat selected.
      )}>
         {activeConversationId ? (
             <>
                <div className="p-8 flex flex-col items-center border-b border-gray-100 dark:border-zinc-800">
                    <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-zinc-800 mb-4"></div>
                    <h2 className="text-lg font-semibold">Alice</h2>
                    <p className="text-sm text-gray-500">Active 5m ago</p>
                </div>
                <div className="p-4 space-y-4">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Shared Media</h3>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="aspect-square bg-gray-100 dark:bg-zinc-900 rounded-lg"></div>
                        <div className="aspect-square bg-gray-100 dark:bg-zinc-900 rounded-lg"></div>
                        <div className="aspect-square bg-gray-100 dark:bg-zinc-900 rounded-lg"></div>
                    </div>
                </div>
             </>
         ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
                Details
            </div>
         )}
      </aside>

    </main>
  );
}

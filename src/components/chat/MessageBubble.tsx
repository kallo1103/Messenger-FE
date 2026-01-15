import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Message, User } from '@/types/chat';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  message: Message;
  isMe: boolean;
  sender?: User; // Optional if not 'me'
}

export function MessageBubble({ message, isMe, sender }: MessageBubbleProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex w-full mb-4",
        isMe ? "justify-end" : "justify-start"
      )}
    >
      {!isMe && (
        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden mr-2 flex-shrink-0">
          {sender?.avatar ? (
            <img src={sender.avatar} alt={sender.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-600">
              {sender?.name?.[0]}
            </div>
          )}
        </div>
      )}

      <div className={cn(
        "max-w-[70%] px-4 py-2 rounded-2xl text-sm relative group",
        isMe 
          ? "bg-blue-600 text-white rounded-br-none" 
          : "bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
      )}>
        <p>{message.content}</p>
        
        {/* Timestamp - visible on hover or always tiny */}
        <span className={cn(
          "text-[10px] absolute -bottom-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap",
           isMe ? "right-0 text-gray-500" : "left-0 text-gray-500"
        )}>
          {format(message.createdAt, 'HH:mm')}
        </span>
      </div>
    </motion.div>
  );
}

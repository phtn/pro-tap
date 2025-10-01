import { useState } from 'react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Icon } from '@/lib/icons'
import Image from 'next/image'

interface ChatScreenProps {
  onNext: () => void;
  onPrev: () => void;
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: string;
}

export const ChatScreen = ({ onNext, onBack }: ChatScreenProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey Sam! I saw your profile and would love to connect about potential collaboration opportunities.',
      sender: 'user',
      timestamp: '2:30 PM',
    },
    {
      id: '2',
      text: "Hi there! Thanks for reaching out. I'd be happy to discuss potential opportunities.",
      sender: 'contact',
      timestamp: '2:32 PM',
    },
    {
      id: '3',
      text: "Great! I'm working on a React project and could use someone with your expertise. Are you available for a quick call this week?",
      sender: 'user',
      timestamp: '2:35 PM',
    },
    {
      id: '4',
      text: "Absolutely! I'm free Thursday afternoon or Friday morning. What works better for you?",
      sender: 'contact',
      timestamp: '2:37 PM',
    },
  ])

  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const contact = {
    name: 'Sam Johnson',
    imageUrl: '/images/sega.png',
    status: 'online',
  }

  return (
    <>
      {/* Top Bar */}
      <div className='absolute top-0 left-0 right-0 z-10 bg-gray-950 border-b border-gray-600/40'>
        <div className='flex items-center justify-between p-4'>
          <Button
            size='icon'
            variant='ghost'
            onClick={onBack}
            className='rounded-full bg-white/10 text-white hover:bg-white/20'
          >
            <Icon
              name='chevron-right'
              className='size-6 aspect-square rotate-180'
            />
          </Button>

          <div className='flex items-center space-x-3'>
            <div className='relative'>
              <Image
                src={contact.imageUrl}
                alt={contact.name}
                width={32}
                height={32}
                className='rounded-full aspect-square size-8 object-cover'
              />
              <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-gray-900' />
            </div>
            <div>
              <div className='text-white text-sm font-medium'>
                {contact.name}
              </div>
              <div className='text-green-400 text-xs'>Online</div>
            </div>
          </div>

          <Button
            size='icon'
            variant='ghost'
            onClick={onNext}
            className='rounded-full bg-white/10 text-white hover:bg-white/20'
          >
            <Icon name='chevron-right' className='size-6 aspect-square' />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className='flex-1 bg-black pt-20 pb-20 px-4 overflow-y-auto'>
        <div className='space-y-4'>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-indigo-500 text-white rounded-br-md'
                      : 'bg-slate-700 text-white rounded-bl-md'
                  }`}
                >
                  <p className='text-sm'>{message.text}</p>
                </div>
                <div
                  className={`text-xs text-gray-400 mt-1 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>

              {message.sender === 'contact' && (
                <div className='order-1 mr-2 mt-auto'>
                  <Image
                    src={contact.imageUrl}
                    alt={contact.name}
                    width={24}
                    height={24}
                    className='rounded-full aspect-square size-6 border border-slate-500 object-cover'
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='absolute bottom-0 left-0 right-0 bg-gray-950 border-t rounded-t-3xl border-gray-700 p-4'
      >
        <div className='flex items-center space-x-3'>
          <div className='flex-1 relative'>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder='Type a message...'
              className='w-full bg-gray-800 text-white rounded-full px-4 py-2 pr-12 text-sm  focus:border-blue-500 focus:outline-none'
            />
            <Button
              size='icon'
              variant='ghost'
              className='absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-gray-700'
            >
              <Icon name='paperclip' className='w-4 h-4' />
            </Button>
          </div>

          <Button
            size='icon'
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className='rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-300'
          >
            <Icon name='arrow-up' className='size-5 aspect-square' />
          </Button>
        </div>
      </motion.div>
    </>
  )
}

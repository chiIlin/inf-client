import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Input,
  Badge,
} from '@/components/ui/base-ui';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, ArrowLeft, Search, MoreVertical } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

interface Chat {
  id: string;
  participantName: string;
  participantAvatar?: string;
  participantType: 'influencer' | 'brand';
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
}

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data для чатів
  const chats: Chat[] = [
    {
      id: '1',
      participantName: 'Анна Коваленко',
      participantType: 'influencer',
      lastMessage: 'Дякую за пропозицію! Коли можемо обговорити деталі?',
      lastMessageTime: new Date(2024, 0, 15, 14, 30),
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: '2',
      participantName: 'EcoLife Ukraine',
      participantType: 'brand',
      lastMessage: 'Ми готові обговорити умови співпраці',
      lastMessageTime: new Date(2024, 0, 15, 12, 15),
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: '3',
      participantName: 'Марія Петренко',
      participantType: 'influencer',
      lastMessage: 'Привіт! Мене цікавить ваша пропозиція',
      lastMessageTime: new Date(2024, 0, 14, 18, 45),
      unreadCount: 1,
      isOnline: true,
    },
  ];

  // Mock data для повідомлень
  const messages: Record<string, Message[]> = {
    '1': [
      {
        id: '1',
        senderId: 'brand',
        text: 'Привіт! Нас цікавить співпраця з вами для промоції нашого нового продукту.',
        timestamp: new Date(2024, 0, 15, 10, 0),
        isRead: true,
      },
      {
        id: '2',
        senderId: 'influencer',
        text: 'Привіт! Дякую за звернення. Розкажіть більше про ваш продукт та умови співпраці.',
        timestamp: new Date(2024, 0, 15, 11, 30),
        isRead: true,
      },
      {
        id: '3',
        senderId: 'brand',
        text: 'Це новий екологічний продукт для догляду за шкірою. Пропонуємо 500 грн за пост + безкоштовні зразки.',
        timestamp: new Date(2024, 0, 15, 13, 15),
        isRead: true,
      },
      {
        id: '4',
        senderId: 'influencer',
        text: 'Дякую за пропозицію! Коли можемо обговорити деталі?',
        timestamp: new Date(2024, 0, 15, 14, 30),
        isRead: false,
      },
    ],
  };

  const filteredChats = chats.filter(chat =>
    chat.participantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedChatData = selectedChat ? chats.find(chat => chat.id === selectedChat) : null;
  const chatMessages = selectedChat ? messages[selectedChat] || [] : [];

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      // Тут буде логіка відправки повідомлення
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return formatTime(date);
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Вчора';
    } else {
      return date.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
      });
    }
  };

  return (
    <div className="min-h-screen">
      

      <section className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                <span className="gradient-text">Повідомлення</span>
              </h1>
              <p className="text-gray-600 mt-2">Спілкуйтеся з інфлюенсерами та брендами</p>
            </div>
            <Button
              variant="outline"
              asChild
              className="border-ua-blue text-ua-blue hover:bg-ua-blue hover:text-white"
            >
              <Link to="/catalog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                До каталогу
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
            {/* Список чатів */}
            <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm border-ua-pink-light">
              <CardHeader className="pb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Пошук чатів..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-ua-blue-light focus:border-ua-pink"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[480px]">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedChat === chat.id ? 'bg-ua-pink-light/20 border-l-4 border-l-ua-pink' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={chat.participantAvatar} />
                            <AvatarFallback className="bg-gradient-to-r from-ua-pink to-ua-pink-soft text-white">
                              {chat.participantName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {chat.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 truncate">
                              {chat.participantName}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {formatDate(chat.lastMessageTime)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                chat.participantType === 'influencer'
                                  ? 'border-ua-pink text-ua-pink'
                                  : 'border-ua-blue text-ua-blue'
                              }`}
                            >
                              {chat.participantType === 'influencer' ? 'Інфлюенсер' : 'Бренд'}
                            </Badge>
                            {chat.unreadCount > 0 && (
                              <Badge className="bg-ua-pink text-white">
                                {chat.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {chat.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Вікно чату */}
            <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-ua-pink-light">
              {selectedChatData ? (
                <>
                  {/* Заголовок чату */}
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={selectedChatData.participantAvatar} />
                            <AvatarFallback className="bg-gradient-to-r from-ua-pink to-ua-pink-soft text-white">
                              {selectedChatData.participantName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {selectedChatData.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {selectedChatData.participantName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {selectedChatData.isOnline ? 'В мережі' : 'Не в мережі'}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  {/* Повідомлення */}
                  <CardContent className="p-0 flex flex-col h-[480px]">
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {chatMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.senderId === 'brand' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <div
                              className={`max-w-[70%] p-3 rounded-lg ${
                                message.senderId === 'brand'
                                  ? 'bg-gradient-to-r from-ua-pink to-ua-pink-soft text-white'
                                  : 'bg-gray-100 text-gray-900'
                              }`}
                            >
                              <p className="text-sm">{message.text}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.senderId === 'brand' ? 'text-white/80' : 'text-gray-500'
                                }`}
                              >
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Поле для введення повідомлення */}
                    <div className="border-t border-gray-100 p-4">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Введіть повідомлення..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="flex-1 border-ua-blue-light focus:border-ua-pink"
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="bg-gradient-to-r from-ua-pink to-ua-pink-soft hover:from-ua-pink-soft hover:to-ua-pink text-white"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-ua-pink to-ua-pink-soft rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Оберіть чат для початку спілкування
                    </h3>
                    <p className="text-gray-500">
                      Виберіть розмову зі списку, щоб почати переписку
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Messages;
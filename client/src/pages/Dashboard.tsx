import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../store/authStore.js';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';

const SOCKET_URL = 'http://localhost:3001';

interface Message {
  id: string;
  username: string;
  text: string;
  time: string;
}

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState<Message[]>([]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('receive_message', (data: Message) => {
      setChatList((prev) => [...prev, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);
  
  const sendMessage = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (message.trim() && socket && user) {
      const messageData: Message = {
        id: crypto.randomUUID(),
        username: user.username,
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      socket.emit('send_message', messageData);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">BubingaChat - Global Room</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Logado como: <b>{user?.username}</b></span>
            <Button onClick={logout} variant="secondary">Logout</Button>
          </div>
        </div>
      </div>

      {/* Área do Chat */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col">
        
        {/* Lista de Mensagens */}
        <div className="flex-1 bg-white rounded-lg shadow p-4 mb-4 overflow-y-auto h-[60vh] border border-gray-200">
          {chatList.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">Nenhuma mensagem ainda. Diga olá!</div>
          ) : (
            <div className="space-y-4">
              {chatList.map((msg) => {
                const isMe = msg.username === user?.username;
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      isMe ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                    }`}>
                      <div className="text-xs opacity-75 mb-1 font-bold flex justify-between gap-4">
                        <span>{msg.username}</span>
                      </div>
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-xs text-gray-400 mt-1">{msg.time}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Input de Envio */}
        <form onSubmit={sendMessage} className="flex gap-2">
          <div className="flex-1">
            <Input
              name="message"
              value={message}
              onChange={setMessage}
              placeholder="Digite sua mensagem..."
              className="mb-0"
            />
          </div>
          <Button type="submit" disabled={!message.trim()}>
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
};
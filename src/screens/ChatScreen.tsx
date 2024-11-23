import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useMutationHooks } from '../hooks/useMutationHooks';
import { getChat } from '../services/ChatService/Chat';

const Chat = () => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: string }>>([]);
  const [input, setInput] = useState<string>('');

  // Sử dụng hook mutation để lấy dữ liệu chat
  const mutationChat = useMutationHooks((data: string) => getChat(data));

  // useEffect để cập nhật tin nhắn khi mutationChat.data thay đổi
  useEffect(() => {
    if (mutationChat.data) {
      const responseMessage = mutationChat.data; // Lấy dữ liệu trả về từ server
      const serverMessage = { text: responseMessage, sender: 'Nhân viên tư vấn' };

      // Cập nhật tin nhắn trả về từ server vào state
      setMessages((prevMessages) => [...prevMessages, serverMessage]);
    }
  }, [mutationChat.data]);

  // Hàm gửi tin nhắn từ client
  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'You' };

      // Cập nhật tin nhắn người dùng vào state
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput(''); // Reset input

      // Gửi tin nhắn tới server
      const newChat = { message: input };
      mutationChat.mutate(newChat); // Gửi tin nhắn tới backend
    }
  };

  // Cập nhật giá trị input khi người dùng nhập
  const handleInputChange = (text: string) => {
    setInput(text);
  };

  return (
    <View style={styles.chatContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hỏi & Đáp</Text>
      </View>
      <ScrollView style={styles.chatMessages}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.chatMessage,
              message.sender === 'You' ? styles.chatMessageYou : styles.chatMessageOther,
            ]}
          >
            <Text style={styles.messageSender}>{message.sender}: </Text>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.chatInput}>
        <TextInput
          value={input}
          onChangeText={handleInputChange}
          placeholder="Nhập tin nhắn..."
          style={styles.input}
          placeholderTextColor="#aaa" // Đặt màu placeholder dễ đọc
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#f5f5f5', // Nền tổng thể sáng
  },
  header: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatMessages: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  chatMessage: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    maxWidth: '80%', // Tin nhắn không vượt quá 80% màn hình
  },
  chatMessageYou: {
    backgroundColor: '#d1e7dd',
    alignSelf: 'flex-end',
  },
  chatMessageOther: {
    backgroundColor: '#f8d7da',
    alignSelf: 'flex-start',
  },
  messageSender: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333', // Màu chữ đậm hơn
  },
  messageText: {
    color: '#000', // Màu chữ rõ ràng
  },
  chatInput: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#fff', // Nền trắng rõ ràng
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#fff', // Đảm bảo nền trắng
    color: '#000', // Màu chữ đen
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

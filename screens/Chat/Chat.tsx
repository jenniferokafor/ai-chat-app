import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import styles from "./chat.styles";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { container } = styles;
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const sendFromApp = useCallback((text: string) => {
    const newMessage = {
      _id: Math.random(),
      text,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "App",
        avatar: "https://placeimg.com/140/140/any", // Provide an appropriate avatar for the app
      },
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [newMessage])
    );
  }, []);

  const onSend = useCallback((messages = []) => {
    console.log(messages[0].text);
    mutation.mutate(messages[0].text);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    sendFromApp("hi back at cha");
  }, []);

  const mutation = useMutation({
    mutationFn: (message) => {
      return axios.post("http://localhost:8000/ask", message);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      console.log(data);
    },
  });

  return (
    <SafeAreaView style={container}>
      <GiftedChat
        messages={messages}
        // @ts-ignore
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};

export default Chat;

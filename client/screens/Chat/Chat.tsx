import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native";
import styles from "./chat.styles";
import { IRole, IMessageContext } from "../../interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hasHitDailyLimit, showAlert } from "../../utils";

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messagesContext, setMessagesContext] = useState<IMessageContext[]>([]);
  const [lastSender, setLastSender] = useState<"user" | "assistant">();
  const { container } = styles;
  const addNewMessageContext = (role: IRole, content: string) => {
    const newMessageContext = {
      role: role,
      content: content,
    };
    setMessagesContext((previousMessagesContext) => [
      ...previousMessagesContext,
      newMessageContext,
    ]);
  };

  const sendFromApp = useCallback((text: string) => {
    const newMessage = {
      _id: Math.random(),
      text,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "AI Assistant",
        avatar: "https://placeimg.com/140/140/any", // Provide an appropriate avatar for the app
      },
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [newMessage])
    );
  }, []);

  const onSend = useCallback((messages = []) => {
    setLastSender("user");
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    addNewMessageContext("user", messages[0].text);
  }, []);

  // send message to server
  const sendMsgToServer = async () => {
    const lastSixMessages = messagesContext.slice(-6);
    try {
      const response = await fetch(
        "https://bc2e-102-88-62-216.ngrok-free.app/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: lastSixMessages,
          }),
        }
      );
      const json = await response.json();
      sendFromApp(json.data.content);
      setLastSender("assistant");
      addNewMessageContext("assistant", json.data.content);
    } catch (error) {
      sendFromApp("Uh oh, something went wrong. Please try again later.");
    } finally {
    }
  };

  const multiSet = async () => {
    const msgs: [string, string] = [
      "@messages",
      JSON.stringify(messages) || "",
    ];
    const msgsContext: [string, string] = [
      "@messagesContext",
      JSON.stringify(messagesContext) || "",
    ];
    try {
      await AsyncStorage.multiSet([msgs, msgsContext]);
    } catch (e) {
      //save error
    }
  };

  const getFromAsyncStorage = async () => {
    let values = undefined;
    try {
      values = await AsyncStorage.multiGet(["@messages", "@messagesContext"]);
      const messages = JSON.parse(values[0][1] || "[]");
      const messagesContext = JSON.parse(values[1][1] || "[]");
      if (messages.length > 0 || messagesContext.length > 0) {
        const messages = JSON.parse(values[0][1] || "[]");
        const messagesContext = JSON.parse(values[1][1] || "[]");
        setMessages(messages);
        setMessagesContext(messagesContext);
      } else {
        setMessages([
          {
            _id: 1,
            text: "I've been waiting all nanosecond for this! What's on your mind?",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "AI Assistant",
              avatar: "https://placeimg.com/140/140/any",
            },
            sent: true,
            received: true,
          },
        ]);
        setMessagesContext([]);
      }
    } catch (e) {
      // read error
    }
  };

  // call BE when user send message
  useEffect(() => {
    if (lastSender === "user") {
      sendMsgToServer();
    }
    if (lastSender === "assistant") {
      multiSet();
    }
    setLastSender(undefined);
  }, [messagesContext]);

  // get messages from async storage
  useEffect(() => {
    getFromAsyncStorage();
    // const removeFew = async () => {
    //   const keys = ["@messages", "@messagesContext"];
    //   try {
    //     await AsyncStorage.multiRemove(keys);
    //   } catch (e) {
    //     // remove error
    //   }
    //
    //   console.log("keys removed");
    // };
    // removeFew();
  }, []);

  return (
    <SafeAreaView style={container}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => {
          if (hasHitDailyLimit(messages)) {
            showAlert({
              title: "Oops! Daily limit reached.",
              message:
                "You have hit your daily limit of 10 messages. Please try again tomorrow.",
            });
          } else {
            // @ts-ignore
            onSend(newMessages);
          }
        }}
        user={{
          _id: 1,
        }}
        alwaysShowSend={true}
      />
    </SafeAreaView>
  );
};

export default Chat;

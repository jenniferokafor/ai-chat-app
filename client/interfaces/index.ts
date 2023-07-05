import type { StackScreenProps } from "@react-navigation/stack";

export type IRole = "system" | "user" | "assistant";

export interface IMessageContext {
  role: IRole;
  content: string;
}

export interface IAlert {
  title: string;
  message: string;
}

export interface IWelcome {
  navigation: StackScreenProps<any, any>;

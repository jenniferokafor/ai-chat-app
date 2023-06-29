export type IRole = "system" | "user" | "assistant";

export interface IMessageContext {
  role: IRole;
  content: string;
}

export interface IAlert {
  title: string;
  message: string;
}

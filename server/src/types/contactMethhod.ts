export enum ContactMethod {
  phone_and_messages = 'phone_and_messages',
  phone = 'phone',
}

export const contactMethodTypeText = {
  [ContactMethod['phone_and_messages']]: 'По телефону и в сообщениях',
  [ContactMethod['phone']]: 'По телефону',
}


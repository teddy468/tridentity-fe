interface MessageMoreData {
  image_url?: string;
  video_url?: string;
  order_id?: number;
  product_id?: number;
}

interface Message {
  speaker: "store" | "customer";
  speaker_id: string;
  message: string;
  timestamp: string;
  store_detail: Store;
  data?: MessageMoreData;
}

interface CreateMessageBody {
  message?: string;
  merchant_store_id?: Store["id"];
  data?: MessageMoreData;
}

interface CreateMessageResponse extends SuccessResponse {
  data: Message;
}

interface Conversation {
  create_time: string;
  update_time: string;
  id: number;
  merchant_store_id: Store["id"];
  user_id: UserInfo["id"];
  data: Message[];
  meta: MixObject;
  latest_message?: Message;
  user_unread_count: number;
  store_unread_count: number;
  store: Store;
}

declare interface UnreadConversation {
  unread_conversations: string;
}

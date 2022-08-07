export interface Payment {
  agreement: boolean;
  amount: string;
  password: number;
  receiver: string;
  receiverBank: string;
  recieverAccNo: string;
  semderAccNo: string;
  sender: string;
  senderBank: string;
  transactionDate: string;
  transactionRef: string;
  transactionStatus: string;
}

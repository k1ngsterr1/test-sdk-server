export type TextAttributes = {
  id: number;
  content: string;
  style: string;
  font: string;
  color: string;
  link: {
    value: string;
    email: string;
    url: string;
    phoneNumber: string;
    subject: string;
    anchor: string;
    blank: boolean;
  };
  size: string;
};
export type TextDetails = {
  content: string;
  style: string;
  font: string;
  color: string;
  link: {
    value: string;
    email: string;
    url: string;
    phoneNumber: string;
    subject: string;
    anchor: string;
    blank: boolean;
  };
  size: string;
};

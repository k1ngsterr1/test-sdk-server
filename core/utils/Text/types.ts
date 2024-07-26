export type LinkDetails = {
  value: string | null;
  email: string | null;
  url: string | null;
  phoneNumber: string | null;
  subject: string | null;
  anchor: string | null;
  blank: boolean | null;
};

export type TextAttributes = {
  id: number;
  content: string;
  style: string;
  font: string;
  color: string;
  link: LinkDetails;
  size: string;
};

export type TextDetails = {
  content: string;
  style: string;
  font: string;
  color: string;
  link: LinkDetails;
  size: string;
};

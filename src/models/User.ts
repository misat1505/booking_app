export type User = {
  uid: string;
  role: "provider" | "buyer";
  displayName: string;
  email: string;
  photoURL: string;
};

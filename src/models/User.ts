export type User = {
  uid: string;
  role: "provider" | "buyer";
  displayName: string | undefined;
  email: string | undefined;
  photoURL: string | undefined;
};

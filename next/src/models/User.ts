export type User = {
  uid: string;
  role: "SALESMAN" | "CUSTOMER";
  displayName: string | undefined;
  email: string | undefined;
  photoURL: string | undefined;
};

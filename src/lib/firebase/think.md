### Implemented a reusable Firestore user module and integrated it into the auth flow.

#### What’s included

- Firestore client export for reuse across the app
- Added db export in src/lib/firebase/index.ts
- Reusable user module at app/protap/users/{uid}
- Created src/lib/firebase/users.ts
- Stores each user at path: app/protap/users/{uid}
- Creates the document if it doesn’t exist; otherwise updates lastLogin using serverTimestamp()
- Strongly typed document shape with no any usage
- Auth context integration
- On auth state change, if a user is present, it calls updateUser to create/update the Firestore document
- Patched src/ctx/auth/index.tsx
- Data model (document fields)

```ts
const user = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  providerIds: string[]
  createdAt: server timestamp // (on first write)
  lastLogin: server timestamp // (on every subsequent sign-in or presence via auth state)
}
```
### How to use the module anywhere

Import: import { updateUser, getUserDocRef } from "@/lib/firebase/users";
Call updateUser(user) with the Firebase Auth User whenever you want to ensure the doc exists and lastLogin is updated.
If you need a reference to the user document: const ref = getUserDocRef(user.uid);
Notes

The Firestore path is implemented as: collection("app") -> doc("protap") -> collection("users") -> doc("{uid}")
The update logic runs on auth state change in the provider to handle interactive sign-in methods reliably.
No any types were introduced; document time fields are typed as Firestore sentinel/timestamp union for correctness.

Files changed/added
- src/lib/firebase/index.ts
- src/lib/firebase/users.ts
- src/ctx/auth/index.tsx

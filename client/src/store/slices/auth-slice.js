// Desc: Auth slice for storing user info
export const createAuthSlice = (set) =>(
 {
    userInfo : undefined,
    setUserInfo : (userInfo) => set({userInfo}),
 }
);

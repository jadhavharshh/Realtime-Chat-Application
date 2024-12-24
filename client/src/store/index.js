import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";
import { chatSlice } from "./slices/chat-slice";


export const userAppStore = create()((...a) =>({
    ...createAuthSlice(...a),
    ...chatSlice(...a),
}))
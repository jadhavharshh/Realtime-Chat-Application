import { create } from "zustand";
import { createAuthSlice } from "./slice/auth-slice";


export const userAppStore = create()((...a) =>({
    ...createAuthSlice(...a),
}))
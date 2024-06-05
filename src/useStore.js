import { create } from "zustand";

export const useStore = create((set)=>({
    isLoading: false,
setIsLoading: (isLoading)=> set({isLoading}),
}))
import { atom} from "recoil";

export const contentAtom = atom({
    key: "contentAtom",
    default: ""
})


export const titleAtom = atom({
    key: "titleAtom",
    default: ""
})


export const imageAtom = atom<File | null |any>({
    key: "imageAtom",
    default: null
})


export const userNameAtom = atom<string>({
    key: "userNameAtom",
    default: "Guest User"
})

export const emailAtom = atom<string>({
    key: "emailAtom",
    default: "Guest User"
})


export const userIdAtom = atom<string>({
    key: "userIdAtom",
    default: ""
})


export const inputAtom = atom<string>({
    key: "inputAtom",
    default: ""
})
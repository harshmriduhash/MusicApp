import { createContext, Dispatch } from "react";

interface NotificationState {
    show: boolean | null;
    setShow: Dispatch<boolean> | null;
    text: any;
    setText: Dispatch<any> | null;
}

export const NotificationContext = createContext<NotificationState>({
    show: null,
    setShow: null,
    text: null,
    setText: null,
});
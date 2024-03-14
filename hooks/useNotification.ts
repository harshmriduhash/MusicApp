import { NotificationContext } from "@/contexts/NotificationContext";
import { useContext } from "react";

export const useNotification = () => {
    let NotificationCntxt = useContext(NotificationContext);
    const addNotification = (title: string) => {
        NotificationCntxt.setText && NotificationCntxt.setText(title);
        NotificationCntxt.setShow && NotificationCntxt.setShow(true);
        setTimeout(() => {
            NotificationCntxt.setShow && NotificationCntxt.setShow(false);
        }, 2000);
    };
    return {
        addNotification,
    };
};

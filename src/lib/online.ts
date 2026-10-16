import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { useSyncExternalStore } from "react";

onlineManager.setEventListener((setOnline) =>
    NetInfo.addEventListener((state) => {
        setOnline(state.isConnected !== false)
    })
)

export function useIsOnline(): boolean {
    return useSyncExternalStore(
        (onChange) => onlineManager.subscribe(() => onChange()),
        () => onlineManager.isOnline(),
        () => true,
    )
}
import { useState, useCallback } from 'react'

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: Date;
}

export interface UseNotificationsOptions {
  maxNotifications?: number;
  autoRemoveDelay?: {
    success?: number;
    error?: number;
    info?: number;
    warning?: number;
  };
}

export interface UseNotificationsReturn {
  notifications: Notification[];
  addNotification: (type: Notification['type'], message: string) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

export const useNotifications = (
  options: UseNotificationsOptions = {}
): UseNotificationsReturn => {
  const {
    maxNotifications = 5,
    autoRemoveDelay = {
      success: 5000,
      error: 7000,
      info: 4000,
      warning: 6000,
    },
  } = options

  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback(
    (type: Notification['type'], message: string): void => {
      const notification: Notification = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        type,
        message,
        timestamp: new Date(),
      }

      setNotifications((prev) => [
        notification,
        ...prev.slice(0, maxNotifications - 1),
      ])

      // Auto-remove notification after specified delay
      const delay = autoRemoveDelay[type]
      if (delay && delay > 0) {
        setTimeout(() => {
          setNotifications((prev) =>
            prev.filter((n) => n.id !== notification.id)
          )
        }, delay)
      }
    },
    [maxNotifications, autoRemoveDelay]
  )

  const removeNotification = useCallback((id: string): void => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const clearAllNotifications = useCallback((): void => {
    setNotifications([])
  }, [])

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
  }
}

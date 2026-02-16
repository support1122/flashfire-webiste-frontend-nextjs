interface Window {
  gtag?: (
    command: "event" | "config" | "set" | "js" | string,
    targetId: string | Date,
    config?: {
      [key: string]: unknown;
    }
  ) => void;
  fbq?: (
    command: "init" | "track" | string,
    eventName?: string,
    params?: Record<string, any>
  ) => void;
  _fbq?: any;
}


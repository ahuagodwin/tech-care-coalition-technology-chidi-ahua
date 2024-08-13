export {}
declare global {
  interface Window {
    safeLog: (...msg: any[]) => void
    playStackNotificationSound: () => void;
    recordSparkAudio: () => any;
    getBOrWFomStarkColor: (color:string) => string;
    userCurrency: () => string;
    formatMoney: (amount:number) => string;
    debounce: (cb: (...args: any[]) => any, delay: number) => void;
    // TODO: to be removed on production
    tempUserImages: Record<string, string>
  }
  let safeLog: (...msg: any[]) => void
  let playStackNotificationSound: () => void;
  let recordSparkAudio: () => any;
  let getBOrWFomStarkColor: (color:string) => string;
  let userCurrency: () => string;
  let formatMoney: (amount:number) => string;
  let debounce: (cb:(...args: any[])=>any, delay:number) => void;
  // TODO: to be removed on production
  let tempUserImages: Record<string, string>
  let Pusher: any
  let CreateWhatsappChatWidget: any
}

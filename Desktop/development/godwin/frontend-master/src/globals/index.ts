// import AuthService from '@/services/auth-service'

// interface Window{
//   safeLog:(...msg: any[]) => void;
//   playStackNotificationSound: () => void;
//   recordSparkAudio: () => any;
//   getBOrWFomStarkColor: (color:string) => string;
//   userCurrency: () => string;
//   debounce: (cb: (...args: any[]) => any, delay: number) => void;
//   // TODO: to be removed on production
//   tempUserImages: Record<string, string>
// }

/* 
 A simple environment aware logger to help maintain console sanity given a bi-context for execution: production or non-production context
*/
window.safeLog = (...msg: any[])=>{
    if(process.env.NODE_ENV == "production") return
    console.log(...msg)
}
window.playStackNotificationSound = () => {
    const audio = new Audio(window.location.origin+'/audio/notification.mpeg')
    audio.play()
}
window.getBOrWFomStarkColor = (color:string) =>{
  if (!color) { return ''; }
  return (parseInt(color.replace('#', '').substring(0,6), 16) > 0xffffff / 2) ? '#000' : '#fff';
}


window.userCurrency = () => {
  const intl = Intl.DateTimeFormat().resolvedOptions().timeZone
  return intl !== 'Africa/Lagos' ? '$' : '₦'
  // const user = AuthService.getLoggedInUser()
  // return user && user.currency=='naira' ? '₦' : '$'
}

window.debounce = (cb, delay = 250) => {
  let timeout: any
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}

window.tempUserImages = {
  user1: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
  user2: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%253D&auto=format&fit=crop&w=800&q=60',
  user3: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  user4: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  user5: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  user6: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  user7: 'https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  user8: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGF2YXRhcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  user9: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGF2YXRhcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  user10: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
}


/* 
How to use
(async () => {
  const recorder = await recordSparkAudio();
  recorder.start();

  setTimeout(async () => {
    const audio = await recorder.stop();
    audio.play();
  }, 3000);
})(); 
*/

  window.recordSparkAudio = () => {
    return new Promise(resolve => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          const audioChunks: BlobPart[] = [];
  
          mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
          });
  
          const start = () => {
            mediaRecorder.start();
          };
  
          const stop = () => {
            return new Promise(resolve => {
              mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                const play = () => {
                  audio.play();
                };
  
                resolve({ audioBlob, audioUrl, play });
              });
  
              mediaRecorder.stop();
            });
          };
  
          resolve({ start, stop });
        });
    });
  };
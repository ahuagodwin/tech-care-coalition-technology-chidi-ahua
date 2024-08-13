const pusher = new Pusher(process.env.VUE_APP_PUSHER_APP_KEY, {
    cluster: 'mt1'
});

export const getBroadcastMessage = (channelName: string, eventName: string, cb:(...args:any[])=> any) => {
    const channel = pusher.subscribe(channelName)
    if (channel) {
        channel.bind(eventName, cb);
    }
}

export default pusher
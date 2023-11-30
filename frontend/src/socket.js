import io from "socket.io-client";

const URL = 'ws://localhost:9090';
export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
});


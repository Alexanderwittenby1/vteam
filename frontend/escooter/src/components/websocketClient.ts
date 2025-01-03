let ws: WebSocket;
let messageHandler: ((data: any) => void) | null = null;

const connectWebSocket = (onOpenCallback: () => void) => {
  ws = new WebSocket('ws://localhost:8080');

  ws.onopen = () => {
    console.log('Connected to WebSocket server');
    onOpenCallback();
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log('Message from server:', data);
      if (messageHandler) {
        messageHandler(data);
      }
    } catch (error) {
      console.error('Error parsing message from server:', error);
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.warn('WebSocket closed.');
    setTimeout(() => connectWebSocket(onOpenCallback), 5000); // Försök återansluta efter 5 sekunder
  };
};

const sendMessage = (message: any) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  } else {
    console.warn('WebSocket is not open. Ready state:', ws.readyState);
  }
};

const registerMessageHandler = (handler: (data: any) => void) => {
  messageHandler = handler;
};

export { sendMessage, registerMessageHandler, connectWebSocket };
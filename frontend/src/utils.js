import { EventSourceParserStream } from 'eventsource-parser/stream';

export async function* parseSSEStream(stream) {
  const sseStream = stream
    .pipeThrough(new TextDecoderStream())  // Decode the stream into text
//    .pipeThrough(new EventSourceParserStream());  // Parse SSE events
  
  // Log the stream state
  //console.log("Stream is ready for consumption", sseStream);
  
  // Iterate through the stream
  // for await (const chunk of sseStream) {
  //   console.log("Received chunk:", chunk);  // Log each chunk to check
  //   if (chunk.type === 'event') {
  //     console.log("Event chunk data:", chunk.data);  // Log the event data
  //     yield chunk.data;  // Yield the event data
  //   } else {
  //     console.log("Non-event chunk:", chunk);  // Log non-event chunks if any
  //   }
  // }
  for await (const chunk of sseStream) {
    yield chunk
  }
}





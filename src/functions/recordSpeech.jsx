export const recordSpeech = async (mediaRecorderRef, audioChunksRef) => {
  try {
    // Request access to the user's microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Initialize MediaRecorder with the microphone stream
    mediaRecorderRef.current = new MediaRecorder(stream);

    // Push audio data to the chunks array when available
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    // Start recording
    mediaRecorderRef.current.start();
  } catch (error) {
    console.error("Error recording audio:", error);
  }
};

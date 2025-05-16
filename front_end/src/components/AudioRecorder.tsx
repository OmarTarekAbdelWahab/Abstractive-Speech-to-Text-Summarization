import { useRef, useState } from "react";

const mimeType = "audio/webm";

interface AudioRecorderProps {
    onFinish: (audioBlob: Blob, audioUrl: string) => void;
}

const AudioRecorder = ({ onFinish }: AudioRecorderProps) => {
    const [recordingStatus, setRecordingStatus] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder>(null);
    const audioChunks = useRef<Blob[]>([]);

    const startRecording = async () => {
        setRecordingStatus(true);

        if (!("MediaRecorder" in window)) {
            alert("MediaRecorder not supported on your browser!");
            return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });

        mediaRecorderRef.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            audioChunks.current.push(event.data);
        };

        mediaRecorderRef.current.start();
    };
    const stopRecording = () => {
        setRecordingStatus(false);
        if (!mediaRecorderRef.current) return;
        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunks.current, { type: mimeType });
            const url = URL.createObjectURL(audioBlob);
            onFinish(audioBlob, url);
            audioChunks.current = [];
        };
        mediaRecorderRef.current.stop();
    };
    return (
        <div className="flex flex-col items-center justify-center space-y-4 mt-4">
            {!recordingStatus ? (
                <button
                    className="bg-primary hover:bg-primary-dark font-semibold px-6 py-3 rounded-lg shadow transition duration-200"
                    onClick={startRecording}
                >
                    🎤 Start Recording
                </button>
            ) : (
                <div className="flex flex-col items-center space-y-2">
                    <p className="text-red-600 font-medium">Recording...</p>
                    <button
                        className="bg-cancel hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition duration-200"
                        onClick={stopRecording}
                    >
                        ⏹ Stop Recording
                    </button>
                </div>
            )}
            {/* {audioUrl && <audio controls src={audioUrl} className="w-full mt-4" />} */}
            {/* {finalAudioBlob && (
                <button
                    className="absolute bottom-2 right-2 bg-success hover:bg-green-700 text-white font-semibold p-3 rounded-lg shadow transition duration-200"
                    onClick={() => onSave(finalAudioBlob, audioUrl)}
                >
                    Save Audio
                </button>
            )} */}
        </div>
    );
};

export default AudioRecorder;

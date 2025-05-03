import { useRef, useState } from "react";

const mimeType = "audio/webm";

interface AudioRecorderProps {
    onSave: (audioBlob: Blob) => void;
}

const AudioRecorder = ({ onSave }: AudioRecorderProps) => {
    const [recordingStatus, setRecordingStatus] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder>(null);
    const audioChunks = useRef<Blob[]>([]);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [finalAudioBlob, setFinalAudioBlob] = useState<Blob | null>(null);

    const startRecording = async () => {
        setAudioUrl(null);
        setFinalAudioBlob(null);

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
        setRecordingStatus(true);
    };
    const stopRecording = () => {
        if (!mediaRecorderRef.current) return;
        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunks.current, { type: mimeType });
            setFinalAudioBlob(audioBlob);
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);
            audioChunks.current = [];
        };
        mediaRecorderRef.current.stop();
        setRecordingStatus(false);
    };
    return (
        <div className="flex flex-col items-center justify-center space-y-4 h-full">
            {!recordingStatus ? (
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition duration-200"
                    onClick={startRecording}
                >
                    🎤 Start Recording
                </button>
            ) : (
                <div className="flex flex-col items-center space-y-2">
                    <p className="text-red-600 font-medium">Recording...</p>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition duration-200"
                        onClick={stopRecording}
                    >
                        ⏹ Stop Recording
                    </button>
                </div>
            )}
            {audioUrl && <audio controls src={audioUrl} className="w-full mt-4" />}
            {finalAudioBlob && (
                <button
                    className="absolute bottom-2 right-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1 rounded-lg shadow transition duration-200"
                    onClick={() => onSave(finalAudioBlob)}
                >
                    Save Audio
                </button>
            )}
        </div>
    );
};

export default AudioRecorder;

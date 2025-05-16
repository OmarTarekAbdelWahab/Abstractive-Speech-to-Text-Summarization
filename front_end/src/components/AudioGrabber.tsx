import React, { useRef, useState } from "react";
import AudioRecorder from "./AudioRecorder";
interface AudioGrabberProps {
    handleGetFile: (newFile: File, newAudioURL: string) => void;
};

const AudioGrabber = ({ handleGetFile }: AudioGrabberProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [showSummaryTools, setShowSummaryTools] = useState(false);
    const [fileName, setFileName] = useState<string>("");

    const handleFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("audio/")) {
        setAudioFile(file);
        setFileName(file.name);
        setAudioURL(URL.createObjectURL(file));
        }
    };

    // const handleDeleteAudioFile = () => {
    //   setAudioFile(null);
    //   setAudioURL(null);
    //   if (fileInputRef.current) {
    //     fileInputRef.current.value = "";
    //   }
    // };

    const handleAudioRecord = (recordedFile: Blob, recordedUrl: string) => {
        // Implement audio recording logic
        const fileFromBlob = new File([recordedFile], "recorded_audio.wav", {
        type: "audio/wav",
        });
        console.log("recordedFile", recordedFile);
        console.log("recordedUrl", recordedUrl);
        setAudioFile(fileFromBlob);
        setAudioURL(recordedUrl);
        setShowSummaryTools(false);
    };

    // const handleLinkInsert = () => {
    //   const url = prompt("Enter URL:");
    //   if (url) {
    //     setInput((prev) => prev + " " + url);
    //   }
    // };

    const changeFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFileName = e.target.value;
        setFileName(newFileName);
        if (audioFile) {
            const newFile = new File([audioFile], newFileName + '.' + audioFile.type.split('/')[1], { type: audioFile.type });
            console.log("New file name:", newFile.name);
            setAudioFile(newFile);
        }
    };

    return (
        <div className="flex flex-col h-full text-text font-primary  justify justify-center items-center">
            <p className="text-3xl">{
                !showSummaryTools? "Ready to start Summarizing your Audio?"
                : "Record Audio"
            }</p>

            {showSummaryTools ? (
                <AudioRecorder onFinish={handleAudioRecord} />
            ): (
                <div className="flex text-xl space-x-4 mt-4">
                <button
                    onClick={() => setShowSummaryTools(true)}
                    className="p-2 rounded-xl bg-primary text-white hover:bg-primary-dark hover:cursor-pointer"
                >
                    {/* <FaMicrophone /> */}
                    Record audio
                </button>
                <div className="flex items-center justify-center">
                    <p className="">{" "} Or {" "}</p>
                </div>
                <button
                    onClick={handleFileUpload}
                    className="p-2 rounded-xl bg-primary text-white hover:bg-primary-dark hover:cursor-pointer"
                >
                    Upload Audio
                </button>

                </div>
            )}
            {
                (!showSummaryTools && audioFile) && (
                    <div className="flex flex-col items-center mt-6 w-full max-w-md p-6">
                        <audio
                            controls
                            src={audioURL || ""}
                            className="w-full rounded mb-4 border-gray-200"
                        />
                        <div className="flex flex-col items-center w-full mb-2">
                            <label className="text-lg font-semibold mr-2" htmlFor="audio-filename">
                                File Name:
                            </label>
                            <div className="flex items-center w-full">
                                <input
                                    id="audio-filename"
                                    type="text"
                                    className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary text-base"
                                    value={fileName.split('.')[0]}
                                    onChange={changeFileName}
                                    placeholder="Enter file name"
                                />
                                <span className="ml-2 text-gray-500 text-md">
                                    .{audioFile?.type.split('/')[1]}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-end w-full mt-2">
                            <button
                                className="px-4 py-2 bg-cancel text-white rounded-xl hover:bg-red-600 transition hover:cursor-pointer"
                                onClick={() => {
                                    setAudioFile(null);
                                    setAudioURL(null);
                                    setFileName("");
                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                }}
                            >
                                Remove
                            </button>
                            <button 
                                className="px-4 py-2 bg-success text-white rounded-xl hover:bg-green-600 transition ml-2 hover:cursor-pointer"
                                onClick={() => {
                                    if (audioFile && audioURL && fileName) {
                                        handleGetFile(audioFile, audioURL);
                                    }
                                }}
                            >
                                Start Summary
                            </button>
                        </div>
                    </div>
                )
            }
            {/* <ToolTip text="insert link">
                <button
                onClick={handleLinkInsert}
                className="p-2 rounded-full bg-secondary text-text hover:bg-secondary/80"
                >
                <FaLink />
                </button>
            </ToolTip> */}
            
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="audio/*"
                onChange={handleFileChange}
            />
            </div>
    )
};

export default AudioGrabber;
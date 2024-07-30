import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const App = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const loadModels = async () => {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                faceapi.nets.faceExpressionNet.loadFromUri('/models')
            ]);
        };

        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
                videoRef.current.srcObject = stream;
            } catch (error) {
                console.error(error);
            }
        };

        const playVideo = () => {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const displaySize = { width: video.width, height: video.height };

            faceapi.matchDimensions(canvas, displaySize);

            setInterval(async () => {
                const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
                const resizedDetections = faceapi.resizeResults(detections, displaySize);

                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                faceapi.draw.drawDetections(canvas, resizedDetections);
                faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
                faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            }, 100);
        };

        const init = async () => {
            await loadModels();
            await startVideo();
        };

        init();
    }, []);

    return (
        <div>
            <video ref={videoRef} width="720" height="560" autoPlay muted></video>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default App;
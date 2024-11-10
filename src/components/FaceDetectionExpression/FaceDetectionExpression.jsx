import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './FaceDetectionExpression.css';

function FaceDetectionExpression() {
  const [expression, setExpression] = useState('Loading...');
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      await faceapi.nets.ageGenderNet.loadFromUri('/models'); // Tambahan untuk deteksi usia dan gender
      console.log("Models loaded");

      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("Error accessing webcam:", err));
    };

    videoRef.current && loadModels();
  }, []);

  const handleVideoOnPlay = () => {
    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    canvasRef.current.append(canvas);
    const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender(); // Tambahkan untuk mendeteksi usia dan gender

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      if (detections.length > 0) {
        const { expressions, age, gender } = detections[0];
        
        // Set gender and age
        setAge(Math.round(age));
        setGender(gender);

        // Get the dominant expression
        if (expressions) {
          const maxExpression = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);
          setExpression(maxExpression);
        }
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Face Expression Detection</h2>
      <div className="relative w-[640px] h-[480px] border-4 border-green-500 dark:border-green-400 rounded-lg overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          autoPlay
          muted
          width="640"
          height="480"
          onPlay={handleVideoOnPlay}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
        />
        <div ref={canvasRef} className="absolute top-0 left-0"></div>
      </div>
      <div className={`mt-4 text-lg font-semibold transition-colors duration-300 ${getExpressionClass(expression)}`}>
        Expression: <span className="capitalize">{expression}</span>
      </div>
      <div className="text-lg text-gray-700 dark:text-gray-300 mt-2">
        {gender && age && (
          <p>
            Gender: <span className="capitalize">{gender}</span>, Age: <span>{age} years</span>
          </p>
        )}
      </div>
    </div>
  );
}

function getExpressionClass(expression) {
  switch (expression.toLowerCase()) {
    case 'smiling':
      return 'text-green-500 dark:text-green-300';
    case 'neutral':
      return 'text-yellow-500 dark:text-yellow-300';
    case 'angry':
      return 'text-red-500 dark:text-red-300';
    case 'surprised':
      return 'text-purple-500 dark:text-purple-300';
    case 'happy':
      return 'text-orange-500 dark:text-orange-300';
    default:
      return 'text-gray-500 dark:text-gray-400';
  }
}

export default FaceDetectionExpression;

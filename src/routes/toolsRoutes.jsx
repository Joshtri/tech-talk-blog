// src/routes/toolsRoutes.js

import AudioCutterPage from '../pages/AudioCutterPage';
import FaceDetectionExpressionPage from '../pages/FaceDetectionExpressionPage';
import VoiceLabPage from '../pages/VoiceLabPage';
import CsHubPage from '../pages/CsHubPage';

const toolsRoutes = [
  { path: "/audio-cutter", element: <AudioCutterPage /> },
  { path: "/face-detection-expression", element: <FaceDetectionExpressionPage /> },
  { path: "/voice-labs", element: <VoiceLabPage /> },
  { path: "/cs-hub", element: <CsHubPage /> },
];

export default toolsRoutes;

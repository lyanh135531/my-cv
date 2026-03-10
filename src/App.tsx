import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import EditorPage from './pages/EditorPage';
import FloatingBackground from './components/FloatingBackground';
import './index.css';

function App() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <FloatingBackground />
      {isEditing ? (
        <EditorPage onBack={() => setIsEditing(false)} />
      ) : (
        <LandingPage onStart={() => setIsEditing(true)} />
      )}
    </>
  );
}

export default App;

import { useState, useEffect } from 'react';
import styles from '../styles/Main.module.css';

export default function Login() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(".");
  let recognition;
  let hasClickedMicrophone = false;

  useEffect(() => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      alert('Browser that does not support Web Speech API.');
      return;
    }
  }, []);

  const toggleListening = () => {
    if (!hasClickedMicrophone) {
      hasClickedMicrophone = true;
    }
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setIsListening(true);

    recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;

      // const cleanedTranscript = result.replace(/[\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/\\-]/g, '');
      // let finalTranscript = cleanedTranscript; 
      // if (cleanedTranscript.length > 7) {
      //   finalTranscript = cleanedTranscript.slice(0, 7); 
      // }
      // setTranscript(finalTranscript);
      setTranscript(result);

      // if (cleanedTranscript.length >= 7) {
      //   stopListening();
      // }
    };


    recognition.onend = () => {
      if (isListening) {
        startListening();
      }
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);

    if (recognition) {
      recognition.stop();
    }
  };

  const subTitleText = isListening
    ? 'Listening'
    : hasClickedMicrophone
      ? 'Retry?'
      : 'Press Mic btn to type';

  return (
    <div>
      <div className={styles.name}>
        <a>NextJs SpeechRecognition</a>
      </div>
      <div className={styles.container}>
        <title>NextJs SpeechRecognition</title>
        <div className={styles.sub_title}>
          <a dangerouslySetInnerHTML={{ __html: subTitleText }} />
        </div>
        <a className={styles.result}>{transcript}</a>
        <div className={styles.mic}>
          <img
            src="../images/mic.png"
            alt="mic btn"
            onClick={toggleListening}
          />
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react'
import { poseInstructions } from '../../utils/data'
import { poseImages } from '../../utils/pose_images'
import './Instructions.css'

export default function Instructions({ currentPose }) {
    const [instructions, setInsntructions] = useState(poseInstructions)

    // Function to read instructions aloud
    const speakInstructions = (instructions) => {
        const speech = new SpeechSynthesisUtterance();
        speech.lang = 'en-US'; // Set language to English
        speech.text = instructions.join('. '); // Combine all instructions into one sentence
        speech.rate = 1; // Adjust speed of speech (1 is normal)
        speech.pitch = 1; // Adjust pitch (1 is normal)

        // Speak the text
        window.speechSynthesis.speak(speech);
    };

    useEffect(() => {
        // When the currentPose changes, speak the instructions for that pose
        if (instructions[currentPose]) {
            speakInstructions(instructions[currentPose]);
        }
    }, [currentPose]);

    return (
        <div className="instructions-container">
            <ul className="instructions-list">
                {instructions[currentPose].map((instruction, index) => {
                    return (
                        <li key={index} className="instruction">
                            {instruction}
                        </li>
                    );
                })}
            </ul>
            <img 
                className="pose-demo-img"
                src={poseImages[currentPose]} 
                alt={currentPose} // Add alt text for accessibility
            />
        </div>
    );
}

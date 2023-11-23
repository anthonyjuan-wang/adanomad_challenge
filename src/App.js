

import './App.css';
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import ReactWordcloud from 'react-wordcloud';
import React, { useState } from 'react';

import { indigo } from '@mui/material/colors';
import { createTheme, ThemeProvider } from "@mui/material";
// Allow users to upload a pdf file and view it in the browser



function App() {

  
  const [resumeContents, setResumeContents] = useState('');
  const [TechnicalSkills, setTechnicalSkills] = useState(''); // ['Python', 'Java', 'C++'
  const [skillsInput, setSkillsInput] = useState(''); 
  const [resumeInput, setResumeInput] = useState('');
  const [showResumeHeader, setShowResumeHeader] = useState(false);

  const handleTextFieldChange = (event) => {
    setResumeInput(event.target.value);
  };


  const handleSkillsChange = (event) => { 
    setSkillsInput(event.target.value);
  };

  const options = {
    rotations: 10,
    rotationAngles: [-90, 0],
  };
  const size = [300, 100];

  function countTechnicalSkills(resumeContents) {
    const skillCount = {};

    // Split the resumeContents into an array of words
    const words = resumeContents.split(' ');

    // Loop over each word
    words.forEach(word => {
      // If the word is in the TechnicalSkills array, increment its value
      if (TechnicalSkills.includes(word)) {
        if (skillCount[word]) {
          skillCount[word]++;
        } else {
          skillCount[word] = 1;
        }
      }
    });

    // Convert the skillCount dictionary into an array of objects
    const skillCountArray = Object.entries(skillCount).map(([text, value]) => ({ text, value }));
    return skillCountArray;
  }
  

  function countWords(resumeContents) {
    const wordCount = {};

    // Split the resumeContents into an array of words
    const words = resumeContents.split(' ');

    // Loop over each word
    words.forEach(word => {
      // If the word is already in the dictionary, increment its value
      if (wordCount[word]) {
        wordCount[word]++;
      } else {
        // If the word is not in the dictionary, add it with a value of 1
        wordCount[word] = 1;
      }
    });

    // Convert the wordCount dictionary into an array of objects
    const wordCountArray = Object.entries(wordCount).map(([text, value]) => ({ text, value }));
    return wordCountArray;
  }

  const callbacks = {
    getWordColor: word => word.value > 50 ? "blue" : "red",
    onWordClick: console.log,
    onWordMouseOver: console.log,
    getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
  }
     
  return (
    
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid black',  }}>
      <h1 className= "header"> Resume Parser </h1>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid black', padding: '16px', marginTop: '16px' }}>
        <TextField 
          id="outlined-multiline-flexible"
          label="Paste Resume Contents Here"
          multiline
          maxRows={4}
          value={resumeInput}
          onChange={handleTextFieldChange}
          sx={{ width: '60vw' }} 
        />
        <Button
          variant="contained"
          component="label"
          color="secondary"
          onClick={() => {
            setResumeContents(resumeInput);
            setResumeInput(''); 
            setShowResumeHeader(true);
          }}
        >
        Parse
        </Button>
      </Box>
      {showResumeHeader && (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid black', padding: '16px', marginTop: '16px', width:'60vw'  }}>
        <h1> Applicants Resume </h1>
        {resumeContents} 
      </Box>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid black', padding: '16px', marginTop: '16px', width:'60vw' }}>
        <h1> Most Frequently Mentioned Words </h1>
        <ReactWordcloud 
          callbacks={callbacks}
          size={size}
          words={countWords(resumeContents)}
          options={options}
          style={{ margin: 'auto'}} // Center the word cloud
        />
        <TextField 
          id="outlined-multiline-flexible"
          label="Enter Required Technical Skills Here"
          multiline
          maxRows={4}
          value={skillsInput}
          onChange={handleSkillsChange}
          onKeyDown={(event) => {
            if (event.enterKey && event.keyCode == '13')
              this.sendMessage();
          }}  
        />
        <Button
          variant="contained"
          component="label"
          color="secondary"
          onClick={() => {
            setTechnicalSkills(skillsInput);
            setSkillsInput(''); 
          }}
        >
          Submit Skills
        </Button>
        <h1> Positionally required skills: </h1>
        {TechnicalSkills}
        <h1> Applicants Skills</h1>
        {countTechnicalSkills(resumeContents).map((skill) => {
          return (
            <div>
              {skill.text} ({skill.value})
            </div>
          );
        })}
    </Box>  
  </Box>
);
}

export default App;
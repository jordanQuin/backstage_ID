import { useState } from "react";
import "./App.css";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import TranslatorService from "./services/TranslatorService";

function App() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("fr");

  const handleTranslate = async () => {
    const result = await TranslatorService.translate(
      inputText,
      targetLang,
      sourceLang
    );
    setTranslatedText(result);
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="source-lang-label">Source Language</InputLabel>
            <Select
              labelId="source-lang-label"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
            >
              <MenuItem value="auto">Auto</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Text to Translate"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="target-lang-label">Target Language</InputLabel>
            <Select
              labelId="target-lang-label"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="de">German</MenuItem>
              <MenuItem value="morse">Morse Code</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleTranslate}>
            Translate
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Translated Text"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={translatedText}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

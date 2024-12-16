import { useState } from "react";
import { DevQuote } from '../../ynovtranslate/@parsifal-m/plugin-dev-quotes-homepage';

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
  

  const isGifUrl = (url: string) => {
    return url.startsWith("https://media");
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
              <MenuItem value="gif">Gif</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleTranslate}>
            Translate
          </Button>
        </Grid>
        <Grid item xs={12}>
          {isGifUrl(translatedText) ? (
            <img
              src={translatedText}
              alt="Translated Gif"
              style={{ maxWidth: "100%" }}
            />
          ) : (
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
          )}
        </Grid>
      </Grid>
      <Grid container spacing={3} alignItems="stretch">
      {entityWarningContent}
      <Grid item md={6}>
        <EntityAboutCard variant="gridItem" />
      </Grid>
      <Grid item md={6} xs={12}>
        <EntityCatalogGraphCard variant="gridItem" height={400} />
      </Grid>
      <Grid item md={4} xs={12}>
        <DevQuote />
      </Grid>
  
      <Grid item md={6} xs={12}>
        <OpaMetadataAnalysisCard />
      </Grid>
  
      <Grid item md={4} xs={12}>
        <EntityLinksCard />
      </Grid>
      <Grid item md={8} xs={12}>
        <EntityHasSubcomponentsCard variant="gridItem" />
      </Grid>
    </Grid>
    </div>
  );
}

export default App;

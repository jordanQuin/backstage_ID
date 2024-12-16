export default class TranslatorService {
  static URL = "https://translate.googleapis.com/translate_a/";
  static MORSE_URL = "http://api.funtranslations.com/translate/morse";

  static async translate(
    text: string,
    target: string,
    source: string = "auto"
  ): Promise<string> {
    if (target == "morse") {
      if (source == "en") {
        return this.translateEnglishToMorse(text);
      } else {
        const englishText = await this.translateToEnglish(text, source);
        return this.translateEnglishToMorse(englishText);
      }
    }

    const response = await fetch(
      `${this.URL}t?client=gtx&sl=${source}&tl=${target}&dt=t&q=${text}`
    );

    const data = await response.json();
    return data[0][0][0];
  }

  static async translateToEnglish(
    text: string,
    source: string
  ): Promise<string> {
    const response = await fetch(
      `${this.URL}single?client=gtx&sl=${source}&tl=en&dt=t&q=${text}`
    );
    const data = await response.json();
    return data[0][0][0];
  }

  static async translateEnglishToMorse(text: string): Promise<string> {
    const response = await fetch(`${this.MORSE_URL}?text=${text}`);
    const data = await response.json();
    return data.contents.translated;
  }
}

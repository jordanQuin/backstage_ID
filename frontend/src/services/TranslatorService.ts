export default class TranslatorService {
  static URL = "https://translate.googleapis.com/translate_a/";
  static GIPHY_URL = "https://api.giphy.com/v1/gifs/search";
  static GIPHY_KEY = "SYuQlNJE9C0WHIe6QFmFGqln9tQQ8SqX";

  static async translate(
    text: string,
    target: string,
    source: string = "auto"
  ): Promise<string> {
    if (target == "gif") {
      if (source == "en") {
        return this.translateEnglishToGif(text);
      } else {
        const englishText = await this.translateToEnglish(text, source);

        return this.translateEnglishToGif(englishText);
      }
    }

    const response = await fetch(
      `${this.URL}t?client=gtx&sl=${source}&tl=${target}&dt=t&q=${text}`
    );

    const data = await response.json();

    return data[0];
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

  static async translateEnglishToGif(text: string): Promise<string> {
    const response = await fetch(
      `${this.GIPHY_URL}?api_key=${this.GIPHY_KEY}&q=${text}&limit=5`
    );

    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.data.length);
    return data.data[randomIndex].images.original.url;
  }
}

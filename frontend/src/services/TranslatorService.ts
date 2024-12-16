export default class TranslatorService {
  static URL = "https://translate.googleapis.com/translate_a/";

  static async translate(
    text: string,
    target: string,
    source: string = "auto"
  ): Promise<string> {
    const response = await fetch(
      `${this.URL}single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${text}`
    );
    const data = await response.json();
    return data[0][0][0];
  }
}

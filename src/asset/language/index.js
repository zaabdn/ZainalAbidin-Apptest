import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'id';
import language_en from './en';
import language_id from './id';

const translations = {
  en: {
    ...language_en,
  },

  id: {
    ...language_id,
  },
};
export default new LocalizedStrings(translations);

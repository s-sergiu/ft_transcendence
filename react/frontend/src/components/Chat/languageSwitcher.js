import languages from './languages';

function changeLanguage(lang) {
  localStorage.setItem('language', lang);
  return lang;
}

export { changeLanguage };

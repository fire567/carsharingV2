import React from 'react';
import classes from './Language.module.css';

const Language = ({ setLanguage, language }) => {
  const isLanguageRussian = () => {
    setLanguage(!language);
  };

  return (
    <div className={classes.change_language_form} onClick={isLanguageRussian}>
      {language ? 'Рус' : 'Eng'}
    </div>
  );
};

export default Language;

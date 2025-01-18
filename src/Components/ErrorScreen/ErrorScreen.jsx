import React from 'react';
import PropTypes from 'prop-types';
import './ErrorScreen.css';

const ErrorScreen = ({ statusCode, message }) => {
  const getErrorMessage = (statusCode) => {
    switch (statusCode) {
      case 400:
        return "Det verkar som om något var fel med din begäran. Försök igen senare.";
      case 401:
        return "Du behöver vara inloggad för att kunna göra denna åtgärd. Vänligen logga in.";
      case 403:
        return "Du har inte rätt behörighet för att göra detta. Vänligen kontakta administratören.";
      case 404:
        return "Vi kunde inte hitta den sida eller resurs du letade efter. Kontrollera länken och försök igen.";
      case 500:
        return "Oj! Något gick fel på vår sida. Försök igen senare.";
      case 502:
        return "Vi har problem med att prata med en annan server. Försök igen snart.";
      case 503:
        return "Servern är tillfälligt otillgänglig. Försök igen om en stund.";
      case 504:
        return "Vi väntade för länge på svar från en annan server. Försök igen snart.";
      default:
        return message || "Ett oväntat fel inträffade. Försök igen senare.";
    }
  };

  return (
    <div id="error-screen">
      <h2>Oj! Något gick fel.</h2>
      <p>{getErrorMessage(statusCode)}</p>
    </div>
  );
};

ErrorScreen.propTypes = {
  statusCode: PropTypes.number.isRequired,
  message: PropTypes.string,
};

export default ErrorScreen;

import i18n from "i18next";
import {
  initReactI18next
} from "react-i18next";

import Backend from "i18next-xhr-backend";

const fallbackLng = [ "en_US" ];
const availableLanguages = [ "en_US", "es_ES" ];

i18n
  .use( Backend ) // load translation using xhr -> see /public/locales. We will add locales in the next step

  .use( initReactI18next ) // pass the i18n instance to react-i18next.

  .init( {

    fallbackLng, // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
    whitelist: availableLanguages,
    //lng: "en_US",
    returnEmptyString: false,
    debug: false, //process.env.NODE_ENV !== 'production',
    ns: [ "translations" ],
    defaultNS: "translations",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ","
    },
    react: {
      bindI18n: "languageChanged",
      bindI18nStore: "",
      transEmptyNodeValue: "",
      transSupportBasicHtmlNodes: true,
      //transKeepBasicHtmlNodesFor: [ "br", "strong", "i" ],
      useSuspense: true,
      wait: true
    }

  } );

export const i18nFallbackLanguages = {

  "es_ES": "es_ES",
  "es-ES": "es_ES",
  "es": "es_ES",
  "es-419": "es_ES", //chrome
  "en_US": "en_US",
  "en-US": "en_US",
  "en": "en_US"

};

export const languages = [

  {

    flag: "/assets/images/flags/countries/usa.svg",
    code: "en_US",
    name: "English",
    country: "United States Of America"

  },
  {

    flag: "/assets/images/flags/countries/usa.svg",
    code: "es_US",
    name: "Español",
    country: "Estados Unidos De America"

  },
  {

    flag: "/assets/images/flags/countries/spain.svg",
    code: "es_ES",
    name: "Español",
    country: "España"

  },
  {

    flag: "/assets/images/flags/countries/mexico.svg",
    code: "es_MX",
    name: "Español",
    country: "Estados Unidos Mexicanos"

  },
  {

    flag: "/assets/images/flags/countries/venezuela.svg",
    code: "es_VE",
    name: "Español",
    country: "Republica Bolivariana De Venezuela"

  },
  {

    flag: "/assets/images/flags/countries/usa.svg",
    code: "en_US1",
    name: "English",
    country: "United States Of America"

  },
  {

    flag: "/assets/images/flags/countries/usa.svg",
    code: "es_US1",
    name: "Español",
    country: "Estados Unidos De America"

  },
  {

    flag: "/assets/images/flags/countries/spain.svg",
    code: "es_ES1",
    name: "Español",
    country: "España"

  },
  {

    flag: "/assets/images/flags/countries/mexico.svg",
    code: "es_MX1",
    name: "Español",
    country: "Estados Unidos Mexicanos"

  },
  {

    flag: "/assets/images/flags/countries/venezuela.svg",
    code: "es_VE1",
    name: "Español",
    country: "Republica Bolivariana De Venezuela"

  }

];

export default i18n;

/*
import enUS from "../locales/en_US";
import esES from "../locales/es_ES";

i18n
  .use( initReactI18next )
  .init( {
    resources: {
      en_US: enUS,
      es_ES: esES,
    },
    lng: "es_ES",
    fallbackLng: "en_US",
    returnEmptyString: false,
    debug: process.env.NODE_ENV !== 'production',
    ns: [ 'translations' ],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      wait: true,
    },
  } );

export default i18n;
*/

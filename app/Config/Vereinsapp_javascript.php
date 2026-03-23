<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Vereinsapp_javascript extends BaseConfig
{
    /**
     * --------------------------------------------------------------------------
     * Lies Mich!
     * --------------------------------------------------------------------------
     *
     * Diese Datei definiert alles rund um javascript
     */

    /**
     * --------------------------------------------------------------------------
     * Pfade javascript-Dateien
     * --------------------------------------------------------------------------
     *
     * Pfade zu den javascript-Dateien, die im View layout eingebunden werden.
     */
    public $pfad = array(
        // 'js/lib/jquery.mobile-1.4.5.js', // https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.js
        'js/lib/jquery-3.7.1.js', // https://code.jquery.com/jquery-3.7.1.js
        'js/lib/jquery-ui.js', // https://code.jquery.com/ui/1.13.2/jquery-ui.js
        'js/lib/jquery.ui.touch-punch.min.js', // https://cdn.jsdelivr.net/npm/jquery-ui-touch-punch@0.2.3/jquery.ui.touch-punch.min.js
        'js/lib/bootstrap.bundle.min.js', // https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js
        'js/lib/luxon.min.js', // https://cdn.jsdelivr.net/npm/luxon@3.4.4/build/global/luxon.min.js
        'js/lib/clipboard.min.js', // https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js

        'js/lib/ajaxqueue.js?v='.VERSION,
        'js/lib/isJson.js?v='.VERSION,
        'js/lib/isArray.js?v='.VERSION,
        'js/lib/isObject.js?v='.VERSION,
        'js/lib/isNumber.js?v='.VERSION,
        'js/lib/isString.js?v='.VERSION,
        'js/lib/isEmptyString.js?v='.VERSION,
        'js/lib/isJquery.js?v='.VERSION,
        'js/lib/isLuxonDateTime.js?v='.VERSION,
        'js/lib/JsonStringifiedZurueck.js?v='.VERSION,
        'js/lib/zufaelligeZeichenketteZurueck.js?v='.VERSION,
        'js/lib/exists.js?v='.VERSION,

        'js/vereinsapp/Vereinsapp_Init.js?v='.VERSION,

        'js/vereinsapp/util/Util_Init.js?v='.VERSION,
        'js/vereinsapp/util/Util_WertBereinigtZurueck.js?v='.VERSION,
        
        'js/vereinsapp/ajax/Ajax_Init.js?v='.VERSION,
        'js/vereinsapp/ajax/Ajax_InDieSchlange.js?v='.VERSION,

        'js/vereinsapp/localstorage/Localstorage_Init.js?v='.VERSION,
        'js/vereinsapp/localstorage/Localstorage_Rein.js?v='.VERSION,
        'js/vereinsapp/localstorage/Localstorage_RausZurueck.js?v='.VERSION,
        'js/vereinsapp/localstorage/Localstorage_Loeschen.js?v='.VERSION,
        'js/vereinsapp/localstorage/Localstorage_Leeren.js?v='.VERSION,

        'js/vereinsapp/log/Log_Init.js?v='.VERSION,
        'js/vereinsapp/log/Log_InDieKonsole.js?v='.VERSION,

        'js/vereinsapp/dom/Dom_Init.js?v='.VERSION,
        'js/vereinsapp/dom/Dom_$WerkzeugInitialisiertZurueck.js?v='.VERSION,
        'js/vereinsapp/dom/Dom_$WerkzeugIn$UmgebungEinfuegen.js?v='.VERSION,
        'js/vereinsapp/dom/Dom_ToastFeuern.js?v='.VERSION,
        'js/vereinsapp/dom/Dom_$ModalOeffnen.js?v='.VERSION,
        'js/vereinsapp/dom/Dom_$ModalInitialisiertZurueck.js?v='.VERSION,
        'js/vereinsapp/dom/Dom_$ModalSchliessen.js?v='.VERSION,
        'js/vereinsapp/dom/Dom_BestaetigungEinfordern.js?v='.VERSION,
        'js/vereinsapp/dom/Dom_$Quelle$ZielVerknuepfen.js?v='.VERSION,
        'js/vereinsapp/dom/Dom_$Quelle$ZielEntknuepfen.js?v='.VERSION,
        'js/vereinsapp/dom/Dom_$ZielZu$QuelleZurueck.js?v='.VERSION,
        
        'js/vereinsapp/liste/Liste_Init.js?v='.VERSION,
        'js/vereinsapp/liste/Liste_$ListeAktualisieren.js?v='.VERSION,
        'js/vereinsapp/liste/Liste_$ListenstatistikAktualisieren.js?v='.VERSION,
        'js/vereinsapp/liste/Liste_BearbeitenModusEinAusschalten.js?v='.VERSION,
        'js/vereinsapp/liste/Liste_WertNachEigenschaftFormatiertZurueck.js?v='.VERSION,

        'js/vereinsapp/liste/element/Liste_ElementErstellen.js?v='.VERSION,
        'js/vereinsapp/liste/element/Liste_ElementAendern.js?v='.VERSION,
        'js/vereinsapp/liste/element/Liste_ElementBemerkungAendern.js?v='.VERSION,
        'js/vereinsapp/liste/element/Liste_ElementLoeschen.js?v='.VERSION,
        'js/vereinsapp/liste/element/Liste_ElementErgaenzen.js?v='.VERSION,
        'js/vereinsapp/liste/element/Liste_$ElementAktualisieren.js?v='.VERSION,
        'js/vereinsapp/liste/element/Liste_Element$LinkAktualisieren.js?v='.VERSION,
        'js/vereinsapp/liste/element/Liste_Element$ZusatzsymbolAktualisieren.js?v='.VERSION,
        'js/vereinsapp/liste/element/Liste_Element$VorschauAktualisieren.js?v='.VERSION,
        'js/vereinsapp/liste/element/Liste_Element$NavigationAktualisieren.js?v='.VERSION,
        'js/vereinsapp/liste/element/Liste_Element$FormularInitialisieren.js?v='.VERSION,
        'js/vereinsapp/liste/element/Liste_Element$FormularWerteNachEigenschaftZurueck.js?v='.VERSION,
        'js/vereinsapp/liste/element/Liste_Element$FormularValidationAktualisieren.js?v='.VERSION,
        'js/vereinsapp/liste/element/Liste_ElementTextMitBeschriftungErsetztZurueck.js?v='.VERSION,

        'js/vereinsapp/liste/event/Liste_EventSqlUpdLocalstorage.js?v='.VERSION,
        'js/vereinsapp/liste/event/Liste_EventLocalstorageUpdVariable.js?v='.VERSION,
        'js/vereinsapp/liste/event/Liste_EventVariableUpdLocalstorage.js?v='.VERSION,
        'js/vereinsapp/liste/event/Liste_EventVariableUpdDom.js?v='.VERSION,

        'js/vereinsapp/liste/variable/Liste_VariableRein.js?v='.VERSION,
        'js/vereinsapp/liste/variable/Liste_VariableRausZurueck.js?v='.VERSION,
        'js/vereinsapp/liste/variable/Liste_VariableLoeschen.js?v='.VERSION,

        'js/vereinsapp/liste/filtern/Liste_FilternInit.js?v='.VERSION,
        'js/vereinsapp/liste/filtern/Liste_$FilternModalOeffnen.js?v='.VERSION,
        'js/vereinsapp/liste/filtern/Liste_$FilternEigenschaftAktualisieren.js?v='.VERSION,
        'js/vereinsapp/liste/filtern/Liste_$FilternEigenschaftAendern.js?v='.VERSION,
        'js/vereinsapp/liste/filtern/Liste_$FilternEigenschaftWertInExklusivAendern.js?v='.VERSION,
        'js/vereinsapp/liste/filtern/Liste_$FilternEigenschaftWertLoeschen.js?v='.VERSION,
        'js/vereinsapp/liste/filtern/Liste_$FilternEigenschaftZuruecksetzen.js?v='.VERSION,
        'js/vereinsapp/liste/filtern/Liste_$FilternVorgegebenAuswaehlen.js?v='.VERSION,
        'js/vereinsapp/liste/filtern/Liste_$FilternLocalStorageSpeichern.js?v='.VERSION,
        'js/vereinsapp/liste/filtern/Liste_FilternManipuliertZurueck.js?v='.VERSION,
        'js/vereinsapp/liste/filtern/Liste_TabelleGefiltertZurueck.js?v='.VERSION,

        'js/vereinsapp/liste/sortieren/Liste_SortierenInit.js?v='.VERSION,
        'js/vereinsapp/liste/sortieren/Liste_$SortierenModalOeffnen.js?v='.VERSION,
        'js/vereinsapp/liste/sortieren/Liste_$SortierenEigenschaftAktualisieren.js?v='.VERSION,
        'js/vereinsapp/liste/sortieren/Liste_$SortierenEigenschaftAendern.js?v='.VERSION,
        'js/vereinsapp/liste/sortieren/Liste_$SortierenEigenschaftZuruecksetzen.js?v='.VERSION,
        'js/vereinsapp/liste/sortieren/Liste_$SortierenLocalStorageSpeichern.js?v='.VERSION,
        'js/vereinsapp/liste/sortieren/Liste_SortierenManipuliertZurueck.js?v='.VERSION,
        'js/vereinsapp/liste/sortieren/Liste_ArraySortiertZurueck.js?v='.VERSION,

        'js/vereinsapp/liste/gruppieren/Liste_GruppierenInit.js?v='.VERSION,
        'js/vereinsapp/liste/gruppieren/Liste_$GruppierenModalOeffnen.js?v='.VERSION,
        'js/vereinsapp/liste/gruppieren/Liste_$GruppierenEigenschaftAktualisieren.js?v='.VERSION,
        'js/vereinsapp/liste/gruppieren/Liste_$GruppierenEigenschaftAendern.js?v='.VERSION,
        'js/vereinsapp/liste/gruppieren/Liste_$GruppierenEigenschaftZuruecksetzen.js?v='.VERSION,
        'js/vereinsapp/liste/gruppieren/Liste_$GruppierenLocalStorageSpeichern.js?v='.VERSION,
        'js/vereinsapp/liste/gruppieren/Liste_GruppierenManipuliertZurueck.js?v='.VERSION,
        'js/vereinsapp/liste/gruppieren/Liste_ArrayGruppiertZurueck.js?v='.VERSION,

        'js/vereinsapp/liste/auswertungen/Liste_AuswertungenInit.js?v='.VERSION,
        'js/vereinsapp/liste/auswertungen/Liste_$AuswertungenAktualisieren.js?v='.VERSION,
        'js/vereinsapp/liste/auswertungen/Liste_$AuswertungAktualisieren.js?v='.VERSION,
        
        'js/vereinsapp/liste/verknuepfungen/Liste_VerknuepfungenModalOeffnen.js?v='.VERSION,
        'js/vereinsapp/liste/verknuepfungen/Liste_VerknuepfungErstellen.js?v='.VERSION,
        'js/vereinsapp/liste/verknuepfungen/Liste_VerknuepfungStatusAendern.js?v='.VERSION,
        'js/vereinsapp/liste/verknuepfungen/Liste_$VerknuepfungenAktualisieren.js?v='.VERSION,
        'js/vereinsapp/liste/verknuepfungen/Liste_VerknuepfungenZuordnen.js?v='.VERSION,

        'js/vereinsapp/liste/verzeichnis/Liste_VerzeichnisInit.js?v='.VERSION,
        'js/vereinsapp/liste/verzeichnis/Liste_$VerzeichnisAktualisieren.js?v='.VERSION,
        'js/vereinsapp/liste/verzeichnis/Liste_$DateiAktualisieren.js?v='.VERSION,
        'js/vereinsapp/liste/verzeichnis/Liste_VerzeichnisAnzahlZurueck.js?v='.VERSION,

    );

    /**
     * Pfade zu den javascript-Dateien, die im View layout eingebunden werden,
     * wenn der Benutzer eingeloggt ist.
     */
    public $pfad_loggedin = array(
        'js/vereinsapp/liste/mitglieder/Mitglieder_Init.js?v='.VERSION,
        'js/vereinsapp/liste/mitglieder/Mitglieder_PasswortAendern.js?v='.VERSION,
        'js/vereinsapp/liste/mitglieder/Mitglieder_PasswortFestlegen.js?v='.VERSION,
        'js/vereinsapp/liste/mitglieder/Mitglieder_EinmalLinkAnzeigen.js?v='.VERSION,
        'js/vereinsapp/liste/mitglieder/Mitglieder_EinmalLinkEmail.js?v='.VERSION,

        'js/vereinsapp/liste/aufgaben/Aufgaben_Init.js?v='.VERSION,

        'js/vereinsapp/liste/termine/Termine_Init.js?v='.VERSION,

        'js/vereinsapp/liste/strafkatalog/Strafkatalog_Init.js?v='.VERSION,

        'js/vereinsapp/liste/notenbank/Notenbank_Init.js?v='.VERSION,
    );
}

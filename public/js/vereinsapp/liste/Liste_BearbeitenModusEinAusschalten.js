/**
 * @param {string} instanz
 * @param {string} liste
 */

function Liste_BearbeitenModusEinAusschalten(instanz, liste) {
    bearbeiten_modus = LISTEN[liste].instanz[instanz].bearbeiten_modus;

    if (bearbeiten_modus !== false) LISTEN[liste].instanz[instanz].bearbeiten_modus = false;
    else LISTEN[liste].instanz[instanz].bearbeiten_modus = true;

    Liste_EventVariableUpdLocalstorage(liste);
    Liste_EventLocalstorageUpdVariable(liste);
    Liste_VerknuepfungenZuordnen(liste);
    Liste_ElementErgaenzen(liste);
    Liste_EventVariableUpdDom(liste);
}

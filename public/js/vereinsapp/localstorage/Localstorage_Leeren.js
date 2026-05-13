/**
 * @param {boolean} bestaetigt
 * @param {Object} dom
 * @param {string} modal_title
 */

function Localstorage_Leeren(bestaetigt, dom, modal_title) {
    if (!bestaetigt)
        Dom_BestaetigungEinfordern(
            Liste_ElementBeschriftungErsetztZurueck(WERKZEUGE.localstorage_leeren.beschriftung.bestaetigung, new Object()),
            modal_title,
            "localstorage_leeren",
            undefined,
        );
    else {
        const datenschutz_richtlinie = Localstorage_RausZurueck("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, undefined);

        localStorage.clear();
        Localstorage_Rein("localstorage_reset", DATETIME.now().toISO());

        if (typeof datenschutz_richtlinie !== "undefined")
            Localstorage_Rein("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, datenschutz_richtlinie);

        if ("$modal" in dom && dom.$modal.exists()) Dom_$ModalSchliessen(dom.$modal);

        Log_InDieKonsole("Localstorage_Leeren: LocalStorage wurde erfolgreich geleert.");
    }
}

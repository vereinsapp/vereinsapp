/**
 * @param {boolean} bestaetigung_einfordern
 * @param {Object} dom
 * @param {string} modal_title
 */

function Schnittstelle_LocalstorageLeeren(bestaetigung_einfordern, dom, modal_title) {
    if (bestaetigung_einfordern)
        Schnittstelle_DomBestaetigungEinfordern("Willst du wirklich deinen LocalStorage leeren?", modal_title, "localstorage_leeren", undefined);
    else {
        const datenschutz_richtlinie = Schnittstelle_LocalstorageRausZurueck("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, undefined);

        localStorage.clear();
        Schnittstelle_LocalstorageRein("localstorage_reset", DATETIME.now().toISO());

        if (typeof datenschutz_richtlinie !== "undefined")
            Schnittstelle_LocalstorageRein("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, datenschutz_richtlinie);

        if ("$modal" in dom && dom.$modal.exists()) Schnittstelle_Dom$ModalSchliessen(dom.$modal);

        Schnittstelle_LogInDieKonsole("LocalStorage wurde erfolgreich geleert.");
    }
}

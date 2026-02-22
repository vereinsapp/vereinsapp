function Schnittstelle_LocalstorageInit() {
    // LOCALSTORAGE LEEREN
    $(document).on("click", ".btn_localstorage_leeren", function () {
        const $btn_localstorage_leeren = $(this);
        if ($btn_localstorage_leeren.hasClass("bestaetigung_einfordern"))
            Schnittstelle_DomBestaetigungEinfordern(
                "Willst du wirklich deinen LocalStorage leeren?",
                Schnittstelle_VariableWertBereinigtZurueck($btn_localstorage_leeren.attr("data-title")),
                "localstorage_leeren",
                new Object(),
            );
        else {
            localstorage_leeren();
            Schnittstelle_Dom$ModalSchliessen($btn_localstorage_leeren.closest(".modal"));
            Schnittstelle_DomToastFeuern("Dein LocalStorage wurde erfolgreich geleert.");
        }
    });

    // LOCALSTORAGE LEEREN ERZWINGEN
    const localstorage_reset_string = Schnittstelle_LocalstorageRausZurueck("localstorage_reset", undefined);
    if (typeof localstorage_reset_string === "undefined" || localstorage_reset_string < DATETIME.fromISO(FORCE_LOCALSTORAGE_RESET_ZEITPUNKT)) {
        localstorage_leeren();
        Schnittstelle_LogInDieKonsole("LocalStorage wurde erzwungenermaßen geleert.");
    }

    function localstorage_leeren() {
        const datenschutz_richtlinie = Schnittstelle_LocalstorageRausZurueck("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, undefined);
        localStorage.clear();
        Schnittstelle_LocalstorageRein("localstorage_reset", DATETIME.now().toISO());
        if (typeof datenschutz_richtlinie !== "undefined")
            Schnittstelle_LocalstorageRein("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, datenschutz_richtlinie);
    }
}

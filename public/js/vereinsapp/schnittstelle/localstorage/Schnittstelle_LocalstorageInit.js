function Schnittstelle_LocalstorageInit() {
    const localstorage_reset_string = Schnittstelle_LocalstorageRausZurueck("localstorage_reset", undefined);
    const datenschutz_richtlinie_string = Schnittstelle_LocalstorageRausZurueck("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, undefined);

    if (
        typeof localstorage_reset_string !== "undefined" &&
        localstorage_reset_string.length >= 2 &&
        localstorage_reset_string.charAt(0) === '"' &&
        localstorage_reset_string.charAt(localstorage_reset_string.length - 1) === '"'
    )
        Schnittstelle_LocalstorageRein("localstorage_reset", localstorage_reset_string.substring(1, localstorage_reset_string.length - 1));

    if (
        typeof datenschutz_richtlinie_string !== "undefined" &&
        datenschutz_richtlinie_string.length >= 2 &&
        datenschutz_richtlinie_string.charAt(0) === '"' &&
        datenschutz_richtlinie_string.charAt(datenschutz_richtlinie_string.length - 1) === '"'
    )
        Schnittstelle_LocalstorageRein(
            "datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM,
            datenschutz_richtlinie_string.substring(1, datenschutz_richtlinie_string.length - 1),
        );

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

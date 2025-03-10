function Schnittstelle_LocalstorageInit() {
    // LOCALSTORAGE LEEREN
    $(document).on("click", ".btn_localstorage_leeren", function () {
        const $btn_localstorage_leeren = $(this);
        if ($btn_localstorage_leeren.hasClass("bestaetigung_einfordern"))
            Schnittstelle_DomBestaetigungEinfordern(
                "Willst du wirklich deinen LocalStorage leeren?",
                $btn_localstorage_leeren.attr("data-title"),
                "btn_localstorage_leeren",
                new Object(),
                "danger"
            );
        else {
            localstorage_leeren();
            Schnittstelle_DomModalSchliessen($btn_localstorage_leeren.closest(".modal"));
            Schnittstelle_DomToastFeuern("Dein LocalStorage wurde erfolgreich geleert.");
        }
    });

    // LOCALSTORAGE LEEREN ERZWINGEN
    if (
        typeof Schnittstelle_LocalstorageRausZurueck("localstorage_reset") === "undefined" ||
        DateTime.fromISO(Schnittstelle_LocalstorageRausZurueck("localstorage_reset")) < DateTime.fromISO(FORCE_LOCALSTORAGE_RESET_ZEITPUNKT)
    ) {
        localstorage_leeren();
        Schnittstelle_LogInDieKonsole("LocalStorage wurde erzwungenermaßen geleert.");
    }
}

function localstorage_leeren() {
    const datenschutz_richtlinie = Schnittstelle_LocalstorageRausZurueck("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM);
    localStorage.clear();
    Schnittstelle_LocalstorageRein("localstorage_reset", DateTime.now());
    if (typeof datenschutz_richtlinie !== "undefined")
        Schnittstelle_LocalstorageRein("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, datenschutz_richtlinie);
}

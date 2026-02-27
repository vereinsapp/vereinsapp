function Schnittstelle_LocalstorageInit() {
    // LOCALSTORAGE LEEREN ERZWINGEN
    const localstorage_reset_string = Schnittstelle_LocalstorageRausZurueck("localstorage_reset", undefined);
    if (typeof localstorage_reset_string === "undefined" || localstorage_reset_string < DATETIME.fromISO(FORCE_LOCALSTORAGE_RESET_ZEITPUNKT))
        Schnittstelle_LocalstorageLeeren(false, new Object());

    // LOCALSTORAGE LEEREN
    $(document).on("click", '.werkzeug[data-werkzeug="localstorage_leeren"]', function () {
        Schnittstelle_LocalstorageLeeren(
            $(this).hasClass("bestaetigung_einfordern"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal") },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
        );
    });
}

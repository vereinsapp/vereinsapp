function Schnittstelle_LocalstorageInit() {
    // LOCALSTORAGE LEEREN ERZWINGEN
    const localstorage_reset_string = Schnittstelle_LocalstorageRausZurueck("localstorage_reset", undefined);
    if (typeof localstorage_reset_string === "undefined" || localstorage_reset_string < DATETIME.fromISO(FORCE_LOCALSTORAGE_RESET_ZEITPUNKT))
        Schnittstelle_LocalstorageLeeren(true, new Object());

    // LOCALSTORAGE LEEREN
    $(document).on("click", '.werkzeug[werkzeug="localstorage_leeren"]', function () {
        Schnittstelle_LocalstorageLeeren(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("modal_title"), undefined),
        );
    });
}

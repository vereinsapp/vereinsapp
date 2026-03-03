function Localstorage_Init() {
    // LOCALSTORAGE LEEREN ERZWINGEN
    const localstorage_reset_string = Localstorage_RausZurueck("localstorage_reset", undefined);
    if (typeof localstorage_reset_string === "undefined" || localstorage_reset_string < DATETIME.fromISO(FORCE_LOCALSTORAGE_RESET_ZEITPUNKT))
        Localstorage_Leeren(true, new Object());

    // LOCALSTORAGE LEEREN
    $(document).on("click", '.werkzeug[werkzeug="localstorage_leeren"]', function () {
        Localstorage_Leeren(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
        );
    });
}

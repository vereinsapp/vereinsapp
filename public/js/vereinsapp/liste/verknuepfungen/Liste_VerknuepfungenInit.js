/**
 */

function Liste_VerknuepfungenInit() {
    // BEMERKUNG AENDERN
    $(document).on("click", '.werkzeug[werkzeug="verknuepfung_bemerkung_aendern"]', function () {
        const verknuepfungen = Util_WertBereinigtZurueck($(this).attr("verknuepfungen"));
        const $modal = $(this).closest(".modal");
        Liste_VerknuepfungBemerkungAendern(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $modal },
            Util_WertBereinigtZurueck($modal.find(".verknuepfung_bemerkung_eingabe").val(), undefined),
            Util_WertBereinigtZurueck($(this).attr(VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"), undefined),
            verknuepfungen,
        );
    });
}

function Liste_SortierenInit() {
    // SORTIEREN MODAL ÖFFNEN
    $(document).on("click", ".btn_sortieren_modal_oeffnen", function () {
        Liste_SortierenAendern(
            true,
            { $modal: undefined, $formular: undefined },
            $(this).attr("data-title"),
            $(this).attr("data-instanz"),
            $(this).attr("data-liste")
        );
    });

    // SORTIEREN ÄNDERN
    $(document).on("change", ".sortieren_eigenschaft, .sortieren_richtung", function () {
        Liste_SortierenAendern(
            false,
            { $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            undefined,
            $(this).closest(".formular").attr("data-instanz"),
            $(this).closest(".formular").attr("data-liste")
        );
    });

    // SORTIEREN LOESCHEN
    $(document).on("click", ".btn_sortieren_loeschen", function () {
        Liste_SortierenLoeschen(
            { $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            $(this).closest(".formular").attr("data-instanz"),
            $(this).closest(".formular").attr("data-liste")
        );
    });
}

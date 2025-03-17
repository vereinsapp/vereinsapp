const FILTERN = new Object();
FILTERN.$blanko_filtern_eigenschaft = new Object();
FILTERN.$blanko_filtern_wert = new Object();

function Liste_FilternInit() {
    // FILTERN MODAL ÖFFNEN
    $(document).on("click", ".btn_filtern_modal_oeffnen", function () {
        Liste_FilternAendern(
            true,
            { $modal: undefined, $formular: undefined, $filtern_eigenschaft: undefined },
            $(this).attr("data-title"),
            $(this).attr("data-instanz"),
            $(this).attr("data-liste")
        );
    });

    // FILTERN ÄNDERN
    $(document).on("change", ".filtern_eigenschaft", function () {
        Liste_FilternAendern(
            false,
            { $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular"), $filtern_eigenschaft: $(this) },
            undefined,
            $(this).closest(".formular").attr("data-instanz"),
            $(this).closest(".formular").attr("data-liste")
        );
    });

    // FILTERN WERT ZWISCHEN INKLUSIV UND EXKLUSIV VERSCHIEBEN
    $(document).on("click", ".btn_filtern_wert_inklusiv_exklusiv", function () {
        Liste_FilternWertInExklusivVerschieben(
            { $filtern_wert: $(this).closest(".filtern_wert") },
            $(this).closest(".formular").attr("data-instanz"),
            $(this).closest(".formular").attr("data-liste")
        );
    });

    // FILTERN WERT LOESCHEN
    $(document).on("click", ".btn_filtern_wert_loeschen", function () {
        Liste_FilternWertLoeschen(
            { $filtern_wert: $(this).closest(".filtern_wert") },
            $(this).closest(".formular").attr("data-instanz"),
            $(this).closest(".formular").attr("data-liste")
        );
    });
}

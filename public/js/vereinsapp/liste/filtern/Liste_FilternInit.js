const FILTERN = new Object();
FILTERN.$blanko_filtern_eigenschaft = new Object();
// FILTERN.$blanko_filtern_element für vorgegebene_werte?

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
}

const FILTERN = new Object();
FILTERN.$blanko_filtern_eigenschaft = new Object();
FILTERN.$blanko_filtern_wert = new Object();

function Liste_FilternInit() {
    // FILTERN MODAL ÖFFNEN
    $(document).on("click", ".btn_filtern_modal_oeffnen", function () {
        Liste_FilternAendern(true, $(this), $(this).attr("data-title"), undefined, $(this).attr("data-liste"));
    });

    // FILTERN ÄNDERN
    $(document).on("change", ".filtern_eigenschaft", function () {
        Liste_FilternAendern(false, $(this), undefined, $(this).attr("data-ziel_id"), $(this).attr("data-liste"));
    });

    // FILTERN WERT ZWISCHEN INKLUSIV UND EXKLUSIV VERSCHIEBEN
    $(document).on("click", ".btn_filtern_wert_inklusiv_exklusiv", function () {
        Liste_FilternWertInExklusivVerschieben(
            $(this).closest(".filtern_wert"),
            $(this).closest(".filtern_eigenschaft").attr("data-ziel_id"),
            $(this).closest(".filtern_eigenschaft").attr("data-liste")
        );
    });

    // FILTERN WERT LOESCHEN
    $(document).on("click", ".btn_filtern_wert_loeschen", function () {
        Liste_FilternWertLoeschen(
            $(this).closest(".filtern_wert"),
            $(this).closest(".filtern_eigenschaft").attr("data-ziel_id"),
            $(this).closest(".filtern_eigenschaft").attr("data-liste")
        );
    });

    // FILTERN LOESCHEN
    $(document).on("click", ".btn_filtern_eigenschaft_loeschen", function () {
        Liste_FilternEigenschaftLoeschen(
            $(this).closest(".filtern_eigenschaft"),
            $(this).closest(".filtern_eigenschaft").attr("data-ziel_id"),
            $(this).closest(".filtern_eigenschaft").attr("data-liste")
        );
    });
}

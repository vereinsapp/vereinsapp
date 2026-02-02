const FILTERN = new Object();
FILTERN.$blanko_filtern_eigenschaft = new Object();
FILTERN.$blanko_filtern_wert = new Object();

function Liste_FilternInit() {
    // FILTERN IM LOCALSTORAGE SPEICHERN
    $(document).on("change", ".filtern_localstorage_speichern", function () {
        Liste_FilternLocalStorageSpeichern(
            Schnittstelle_VariableWertBereinigtZurueck($(this).val(), undefined),
            $(this).attr("data-instanz"),
            $(this).attr("data-liste"),
        );
    });

    // FILTERN MODAL ÖFFNEN
    $(document).on("click", ".btn_filtern_modal_oeffnen", function () {
        Liste_FilternModalOeffnen($(this), $(this).attr("data-title"), $(this).attr("data-liste"));
    });

    // VORGEGEBENE FILTER AUSWÄHLEN
    $(document).on("change", ".vorgegebene_filter_auswahl", function () {
        Liste_FilternVorgegebenAuswaehlen(
            $(this),
            $(this).closest(".vorgegebene_filter").attr("data-ziel_id"),
            $(this).val(),
            $(this).closest(".vorgegebene_filter").attr("data-liste"),
        );
    });

    // FILTERN ÄNDERN
    $(document).on("change", ".filtern_eigenschaft", function () {
        Liste_FilternAendern($(this), $(this).attr("data-ziel_id"), $(this).attr("data-liste"));
    });

    // FILTERN WERT ZWISCHEN INKLUSIV UND EXKLUSIV VERSCHIEBEN
    $(document).on("click", ".btn_filtern_wert_inklusiv_exklusiv", function () {
        Liste_$FilternWertInExklusivVerschieben(
            $(this).closest(".filtern_wert"),
            $(this).closest(".filtern_eigenschaft").attr("data-ziel_id"),
            $(this).closest(".filtern_eigenschaft").attr("data-liste"),
        );
    });

    // FILTERN WERT LOESCHEN
    $(document).on("click", ".btn_filtern_wert_loeschen", function () {
        Liste_$FilternWertLoeschen(
            $(this).closest(".filtern_wert"),
            $(this).closest(".filtern_eigenschaft").attr("data-ziel_id"),
            $(this).closest(".filtern_eigenschaft").attr("data-liste"),
        );
    });

    // FILTERN EIGENSCHAFT ZURÜCKSETZEN
    $(document).on("click", ".btn_filtern_eigenschaft_loeschen", function () {
        Liste_$FilternEigenschaftZuruecksetzen(
            $(this).closest(".filtern_eigenschaft"),
            $(this).closest(".filtern_eigenschaft").attr("data-ziel_id"),
            $(this).closest(".filtern_eigenschaft").attr("data-liste"),
        );
    });
}

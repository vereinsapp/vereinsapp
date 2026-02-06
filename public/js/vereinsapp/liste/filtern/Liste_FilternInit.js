const FILTERN = new Object();
FILTERN.$blanko_filtern_eigenschaft = new Object();
FILTERN.$blanko_filtern_wert = new Object();

function Liste_FilternInit() {
    // FILTERN IM LOCALSTORAGE SPEICHERN
    $(document).on("change", ".filtern_localstorage", function () {
        Liste_$FilternLocalStorageSpeichern($(this));
    });

    // FILTERN MODAL ÖFFNEN
    $(document).on("click", ".btn_filtern_manip", function () {
        Liste_$FilternModalOeffnen($(this));
    });

    // VORGEGEBENE FILTER AUSWÄHLEN
    $(document).on("change", ".filtern_vorgegeben", function (e) {
        Liste_$FilternVorgegebenAuswaehlen($(this), Schnittstelle_VariableWertBereinigtZurueck($(e.target).val(), undefined));
    });

    // FILTERN ÄNDERN
    $(document).on("change", ".filtern_eigenschaft", function () {
        Liste_$FilternEigenschaftAendern($(this));
    });

    // FILTERN WERT ZWISCHEN INKLUSIV UND EXKLUSIV VERSCHIEBEN
    $(document).on("click", ".btn_filtern_wert_inklusiv_exklusiv", function () {
        Liste_$FilternEigenschaftWertInExklusivAendern(
            $(this).closest(".filtern_eigenschaft"),
            Schnittstelle_VariableWertBereinigtZurueck($(this).closest(".filtern_wert").attr("data-wert"), undefined),
        );
    });

    // FILTERN WERT LOESCHEN
    $(document).on("click", ".btn_filtern_wert_loeschen", function () {
        Liste_$FilternEigenschaftWertLoeschen(
            $(this).closest(".filtern_eigenschaft"),
            Schnittstelle_VariableWertBereinigtZurueck($(this).closest(".filtern_wert").attr("data-wert"), undefined),
        );
    });

    // FILTERN EIGENSCHAFT ZURÜCKSETZEN
    $(document).on("click", ".btn_filtern_eigenschaft_zuruecksetzen", function () {
        Liste_$FilternEigenschaftZuruecksetzen($(this).closest(".filtern_eigenschaft"));
    });
}

/**
 */

function Liste_SortierenInit() {
    // SORTIEREN IM LOCALSTORAGE SPEICHERN
    $(document).on("change", ".sortieren_localstorage", function () {
        Liste_$SortierenLocalStorageSpeichern($(this));
    });

    // SORTIEREN MODAL ÖFFNEN
    $(document).on("click", ".btn_sortieren_modal_oeffnen", function () {
        Liste_$SortierenModalOeffnen($(this));
    });

    // SORTIEREN ÄNDERN
    $(document).on("change", ".sortieren_eigenschaft", function () {
        Liste_$SortierenEigenschaftAendern($(this));
    });

    // SORTIEREN EIGENSCHAFT ZURÜCKSETZEN
    $(document).on("click", ".btn_sortieren_eigenschaft_zuruecksetzen", function () {
        Liste_$SortierenEigenschaftZuruecksetzen($(this).closest(".sortieren_eigenschaft"));
    });
}

/**
 */

function Liste_SortierenInit() {
    // SORTIEREN IM LOCALSTORAGE SPEICHERN
    $(document).on("change", ".sortieren_localstorage_speichern", function () {
        Liste_SortierenLocalStorageSpeichern(
            Schnittstelle_VariableWertBereinigtZurueck($(this).val(), undefined),
            $(this).attr("data-instanz"),
            $(this).attr("data-liste"),
        );
    });

    // SORTIEREN MODAL ÖFFNEN
    $(document).on("click", ".btn_sortieren_modal_oeffnen", function () {
        Liste_SortierenModalOeffnen($(this));
    });

    // SORTIEREN ÄNDERN
    $(document).on("change", ".sortieren_eigenschaft", function () {
        Liste_$SortierenEigenschaftAendern($(this));
    });

    // SORTIEREN EIGENSCHAFT ZURUECKSETZEN
    $(document).on("click", ".btn_sortieren_eigenschaft_zuruecksetzen", function () {
        Liste_$SortierenEigenschaftZuruecksetzen($(this).closest(".sortieren_eigenschaft"));
    });
}

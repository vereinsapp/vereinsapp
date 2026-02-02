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
        Liste_SortierenModalOeffnen($(this), $(this).attr("data-title"), $(this).attr("data-liste"));
    });

    // SORTIEREN ÄNDERN
    $(document).on("change", ".sortieren_eigenschaft", function () {
        Liste_SortierenAendern($(this), $(this).attr("data-ziel_id"), $(this).attr("data-liste"));
    });

    // SORTIEREN ZURUECKSETZEN
    $(document).on("click", ".btn_sortieren_eigenschaft_loeschen", function () {
        Liste_$SortierenEigenschaftZuruecksetzen(
            $(this).closest(".sortieren_eigenschaft"),
            $(this).closest(".sortieren_eigenschaft").attr("data-ziel_id"),
            $(this).closest(".sortieren_eigenschaft").attr("data-liste"),
        );
    });
}

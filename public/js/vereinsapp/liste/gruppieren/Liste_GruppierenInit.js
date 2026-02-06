/**
 */

function Liste_GruppierenInit() {
    // GRUPPIEREN IM LOCALSTORAGE SPEICHERN
    $(document).on("change", ".gruppieren_localstorage_speichern", function () {
        Liste_GruppierenLocalStorageSpeichern(
            Schnittstelle_VariableWertBereinigtZurueck($(this).val(), undefined),
            $(this).attr("data-instanz"),
            $(this).attr("data-liste"),
        );
    });

    // GRUPPIEREN MODAL ÖFFNEN
    $(document).on("click", ".btn_gruppieren_modal_oeffnen", function () {
        Liste_$GruppierenModalOeffnen($(this));
    });

    // GRUPPIEREN ÄNDERN
    $(document).on("change", ".gruppieren_eigenschaft", function () {
        Liste_$GruppierenEigenschaftAendern($(this));
    });

    // GRUPPIEREN EIGENSCHAFT ZURÜCKSETZEN
    $(document).on("click", ".btn_gruppieren_eigenschaft_zuruecksetzen", function () {
        Liste_$GruppierenEigenschaftZuruecksetzen($(this).closest(".gruppieren_eigenschaft"));
    });
}

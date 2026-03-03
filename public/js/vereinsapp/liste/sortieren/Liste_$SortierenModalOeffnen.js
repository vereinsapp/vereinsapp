/**
 * @param {JQuery} $werkzeug
 */

function Liste_$SortierenModalOeffnen($werkzeug) {
    const liste = Util_WertBereinigtZurueck($werkzeug.attr("liste"), undefined);

    const $neues_sortieren_modal = Dom_$NeuesModalInitialisiertZurueck(
        Util_WertBereinigtZurueck($werkzeug.attr("modal_title"), undefined),
        "sortieren_manip_modal",
    );

    Dom_$ModalOeffnen($neues_sortieren_modal);

    // Initialiserung von $sortieren_vorgegeben
    // entfällt, weil (noch) keine vorgegebene Filter für sortieren existieren

    // Initialiserung von $sortieren_eigenschaft
    const $sortieren_eigenschaft = $neues_sortieren_modal.find(".sortieren_eigenschaft");
    $sortieren_eigenschaft.attr("liste", liste);
    const $sortieren_wert = $neues_sortieren_modal.find(".sortieren_wert");
    $sortieren_wert.empty();
    $.each(SORTIERBARE_EIGENSCHAFTEN[liste], function (position, eigenschaft) {
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            $('<option value="' + eigenschaft + '">' + EIGENSCHAFTEN[liste][eigenschaft].beschriftung + "</option>").appendTo($sortieren_wert);
        } else
            Log_InDieKonsole(
                "Liste_$SortierenFormularInitialisieren: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
            );
    });

    // Verknüpfung von $sortieren_vorgegeben und $sortieren_eigenschaft mit $werkzeug
    Dom_$Quelle$ZielVerknuepfen($neues_sortieren_modal.find(".sortieren_vorgegeben, .sortieren_eigenschaft"), $werkzeug);

    // Aktualisieren der $sortieren_eigenschaft
    Liste_$SortierenEigenschaftAktualisieren($sortieren_eigenschaft);
}

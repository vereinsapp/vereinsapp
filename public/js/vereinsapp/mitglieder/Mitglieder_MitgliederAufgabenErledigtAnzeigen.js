function Mitglieder_MitgliederAufgabenErledigtAnzeigen(dom, title) {
    const element_ids = new Array();
    $.each(dom.$liste.find(".element"), function () {
        element_ids.push(Number($(this).attr("data-element_id")));
    });

    const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "mitglieder_aufgaben_erledigt_anzeigen");
    $mitglieder_aufgaben_erledigt = $neues_modal.find("#mitglieder_aufgaben_erledigt.liste");

    // TABELLE FILTERN
    // filtern aus data
    let filtern_data = $mitglieder_aufgaben_erledigt.attr("data-filtern");
    if (typeof filtern_data !== "undefined") filtern_data = Schnittstelle_VariableObjektBereinigtZurueck(JSON.parse(filtern_data));
    else filtern_data = new Object();
    // filtern aus mitglied_ids
    const filtern_mitglied_ids = { id: { inklusiv: new Array() } };
    $.each(element_ids, function () {
        const mitglied_id = Number(LISTEN.aufgaben.tabelle[this].mitglied_id);
        if (!filtern_mitglied_ids.id.inklusiv.includes(mitglied_id)) filtern_mitglied_ids.id.inklusiv.push(Number(mitglied_id));
    });
    // data und LocalStorage kombinieren
    $mitglieder_aufgaben_erledigt.attr(
        "data-filtern",
        JSON.stringify(Liste_FilternMitPrioKombiniertZurueck(filtern_data, filtern_mitglied_ids, "mitglieder"))
    );

    Schnittstelle_DomModalOeffnen($neues_modal);
    Schnittstelle_EventAusfuehren(Schnittstelle_EventVariableUpdDom, { liste: "mitglieder" });
}

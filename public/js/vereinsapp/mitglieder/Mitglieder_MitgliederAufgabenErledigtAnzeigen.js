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
    if (typeof filtern_data !== "undefined") filtern_data = Schnittstelle_VariableArrayBereinigtZurueck(JSON.parse(filtern_data));
    else filtern_data = new Array();
    // filtern aus element_ids
    const mitglied_ids = new Array();
    let filtern_element_ids = [{ verknuepfung: "||", filtern: new Array() }];
    $.each(element_ids, function () {
        const mitglied_id = Number(LISTEN.aufgaben.tabelle[this].mitglied_id);
        if (!mitglied_ids.includes(mitglied_id)) {
            mitglied_ids.push(mitglied_id);
            filtern_element_ids[0].filtern.push({ operator: "==", eigenschaft: "id", wert: mitglied_id });
        }
    });
    // data und LocalStorage kombinieren
    let filtern_kombiniert;
    if (filtern_element_ids.length === 0) filtern_kombiniert = filtern_data;
    else if (filtern_data.length === 0) filtern_kombiniert = filtern_element_ids;
    else filtern_kombiniert = [{ verknuepfung: "&&", filtern: [filtern_data[0], filtern_element_ids[0]] }];

    $mitglieder_aufgaben_erledigt.attr("data-filtern", JSON.stringify(filtern_kombiniert));
    Schnittstelle_DomModalOeffnen($neues_modal);
    Schnittstelle_EventAusfuehren(Schnittstelle_EventVariableUpdDom, { liste: "mitglieder" });
}

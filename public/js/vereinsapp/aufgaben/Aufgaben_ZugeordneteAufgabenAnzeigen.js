function Aufgaben_ZugeordneteAufgabenAnzeigen(dom, title) {
    const liste = dom.$liste.attr("data-liste");

    const element_ids = new Array();
    $.each(dom.$liste.find(".element"), function () {
        element_ids.push(Number($(this).attr("data-element_id")));
    });

    const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "zugeordnete_aufgaben_modal");
    $zugeordnete_aufgaben = $neues_modal.find("#zugeordnete_aufgaben.liste");

    // TABELLE FILTERN
    // filtern aus data
    let filtern_data = $zugeordnete_aufgaben.attr("data-filtern");
    if (typeof filtern_data !== "undefined") filtern_data = Schnittstelle_VariableArrayBereinigtZurueck(JSON.parse(filtern_data));
    else filtern_data = new Array();
    // filtern aus element_ids
    let filtern_element_ids = [{ verknuepfung: "||", filtern: new Array() }];
    $.each(LISTEN.aufgaben.tabelle, function () {
        const aufgabe = this;
        if ("id" in aufgabe && aufgabe.zugeordnete_liste == liste && element_ids.includes(Number(aufgabe.zugeordnete_element_id)))
            filtern_element_ids[0].filtern.push({ operator: "==", eigenschaft: "id", wert: Number(aufgabe.id) });
    });
    // data und LocalStorage kombinieren
    let filtern_kombiniert;
    if (filtern_element_ids.length === 0) filtern_kombiniert = filtern_data;
    else if (filtern_data.length === 0) filtern_kombiniert = filtern_element_ids;
    else filtern_kombiniert = [{ verknuepfung: "&&", filtern: [filtern_data[0], filtern_element_ids[0]] }];

    $zugeordnete_aufgaben.attr("data-filtern", JSON.stringify(filtern_kombiniert));
    Schnittstelle_DomModalOeffnen($neues_modal);
    Schnittstelle_EventAusfuehren(Schnittstelle_EventVariableUpdDom, { liste: "aufgaben" });
}

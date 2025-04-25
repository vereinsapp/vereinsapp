function Aufgaben_ZugeordneteAufgabenAnzeigen(dom, title) {
    const element_ids = new Array();
    $.each(dom.$liste.find(".element"), function () {
        element_ids.push(Number($(this).attr("data-element_id")));
    });

    const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "zugeordnete_aufgaben_anzeigen");
    $zugeordnete_aufgaben = $neues_modal.find("#zugeordnete_aufgaben.liste");

    // TABELLE FILTERN
    // filtern aus data
    let filtern_data = $zugeordnete_aufgaben.attr("data-filtern");
    if (typeof filtern_data !== "undefined") filtern_data = Schnittstelle_VariableWertBereinigtZurueck(filtern_data);
    else filtern_data = new Object();
    // filtern aus element_ids
    const filtern_element_ids = { id: { inklusiv: new Array() } };
    $.each(LISTEN.aufgaben.tabelle, function () {
        const aufgabe = this;
        if (
            "id" in aufgabe &&
            aufgabe.zugeordnete_liste == dom.$liste.attr("data-liste") &&
            element_ids.includes(Number(aufgabe.zugeordnete_element_id))
        )
            filtern_element_ids.id.inklusiv.push(Number(aufgabe.id));
    });
    // data und LocalStorage kombinieren
    $zugeordnete_aufgaben.attr(
        "data-filtern",
        JsonStringifiedZurueck(Liste_FilternMitPrioKombiniertZurueck(filtern_data, filtern_element_ids, "aufgaben"))
    );

    Schnittstelle_DomModalOeffnen($neues_modal);
    Schnittstelle_EventAusfuehren(Schnittstelle_EventVariableUpdDom, { liste: "aufgaben" });
}

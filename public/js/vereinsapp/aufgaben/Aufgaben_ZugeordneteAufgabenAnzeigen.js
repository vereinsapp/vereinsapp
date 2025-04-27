function Aufgaben_ZugeordneteAufgabenAnzeigen(dom, title) {
    const element_ids = new Array();
    $.each(dom.$liste.find(".element"), function () {
        element_ids.push(Number($(this).attr("data-element_id")));
    });

    const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "zugeordnete_aufgaben_anzeigen");

    let filtern_data = $neues_modal.find('.liste[data-liste="aufgaben"]').attr("data-filtern");
    if (typeof filtern_data !== "undefined") filtern_data = Schnittstelle_VariableWertBereinigtZurueck(filtern_data);
    else filtern_data = new Object();

    const filtern_zugeordnete_aufgaben = { id: { inklusiv: new Array() } };
    $.each(LISTEN.aufgaben.tabelle, function () {
        const aufgabe = this;
        if (
            "id" in aufgabe &&
            aufgabe.zugeordnete_liste == dom.$liste.attr("data-liste") &&
            element_ids.includes(Number(aufgabe.zugeordnete_element_id))
        )
            filtern_zugeordnete_aufgaben.id.inklusiv.push(Number(aufgabe.id));
    });

    $neues_modal
        .find('.liste[data-liste="aufgaben"]')
        .attr("data-filtern", JsonStringifiedZurueck(Liste_FilternMitPrioKombiniertZurueck(filtern_data, filtern_zugeordnete_aufgaben, "aufgaben")));

    Schnittstelle_DomModalOeffnen($neues_modal);
    Schnittstelle_EventAusfuehren(Schnittstelle_EventVariableUpdDom, { liste: "aufgaben" });
}

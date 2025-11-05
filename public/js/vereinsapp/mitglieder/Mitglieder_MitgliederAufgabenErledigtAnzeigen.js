function Mitglieder_MitgliederAufgabenErledigtAnzeigen(dom, title) {
    const element_ids = new Array();
    $.each(dom.$liste.find(".element"), function () {
        element_ids.push(Number($(this).attr("data-element_id")));
    });

    const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "mitglieder_aufgaben_erledigt_anzeigen");
    const $mitglieder_aufgaben_erledigt = $neues_modal.find("#mitglieder_aufgaben_erledigt.liste");

    const filtern_data = Schnittstelle_VariableWertBereinigtZurueck($mitglieder_aufgaben_erledigt.attr("data-filtern"), new Object());
    const filtern_mitglied_ids = { id: { inklusiv: new Array() } };
    $.each(element_ids, function () {
        const mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", this, "aufgaben", undefined);
        if (!filtern_mitglied_ids.id.inklusiv.includes(mitglied_id)) filtern_mitglied_ids.id.inklusiv.push(mitglied_id);
    });

    $mitglieder_aufgaben_erledigt.attr(
        "data-filtern",
        JsonStringifiedZurueck(Liste_FilternMitPrioKombiniertZurueck(filtern_data, filtern_mitglied_ids, "mitglieder"), new Object())
    );

    Schnittstelle_DomModalOeffnen($neues_modal);
    Schnittstelle_EventVariableUpdDom("mitglieder");
}

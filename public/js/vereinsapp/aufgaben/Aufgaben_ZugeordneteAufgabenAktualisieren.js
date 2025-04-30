function Aufgaben_ZugeordneteAufgabenAktualisieren($zugeordnete_aufgaben, zugeordnete_instanz) {
    const $zugeordnete_liste = $("#" + zugeordnete_instanz);
    const zugeordnete_liste = $zugeordnete_liste.attr("data-liste");

    let filtern_data = $zugeordnete_aufgaben.attr("data-filtern");
    if (typeof filtern_data !== "undefined") filtern_data = Schnittstelle_VariableWertBereinigtZurueck(filtern_data);
    else filtern_data = new Object();

    const zugeordnete_element_ids = new Array();
    $.each($("#" + zugeordnete_instanz).find(".element"), function () {
        zugeordnete_element_ids.push(Number($(this).attr("data-element_id")));
    });

    const filtern_zugeordnete_element_ids = { id: { inklusiv: new Array() } };
    $.each(LISTEN.aufgaben.tabelle, function () {
        const aufgabe = this;
        if (
            "id" in aufgabe &&
            aufgabe.zugeordnete_liste == zugeordnete_liste &&
            zugeordnete_element_ids.includes(Number(aufgabe.zugeordnete_element_id))
        )
            filtern_zugeordnete_element_ids.id.inklusiv.push(Number(aufgabe.id));
    });

    $zugeordnete_aufgaben.attr(
        "data-filtern",
        JsonStringifiedZurueck(Liste_FilternMitPrioKombiniertZurueck(filtern_data, filtern_zugeordnete_element_ids, "aufgaben"))
    );
}

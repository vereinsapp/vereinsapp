function Liste_CheckAktualisieren($check, disabled, element_id, liste) {
    const $element = $check.closest('.element[data-liste="' + liste + '"][data-element_id="' + element_id + '"]');
    const $label = $check.siblings("label").first();

    const verknuepfungen = Schnittstelle_VariableWertBereinigtZurueck($check.attr("data-verknuepfungen"), undefined);
    const gegen_liste = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-gegen_liste"), undefined);
    const gegen_element_id = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-gegen_element_id"), undefined);
    let verknuepfung_id = undefined;
    $.each(
        Schnittstelle_VariableRausZurueck("zugeordnete_" + LISTEN[verknuepfungen].element + "_ids", gegen_element_id, gegen_liste, new Array()),
        function (position, zugeordnete_verknuepfung_id) {
            if (
                Schnittstelle_VariableRausZurueck(LISTEN[liste].element + "_id", zugeordnete_verknuepfung_id, verknuepfungen, undefined) ===
                element_id
            )
                verknuepfung_id = zugeordnete_verknuepfung_id;
        }
    );

    const verknuepfung_status = Schnittstelle_VariableRausZurueck("status", verknuepfung_id, verknuepfungen, undefined);

    // Check setzen
    $check.attr("checked", verknuepfung_status > 0);

    // Klassen setzen und Label mit dem Check verknüpfen
    $check.parent().addClass("form-check").addClass("form-switch");
    $check.attr("id", element_id).val(element_id);
    $label.addClass("form-check-label").attr("for", element_id);

    // Check ggf. ausgrauen
    $label.add($check).attr("disabled", disabled);
    if (disabled) $label.add($check).removeAttr("role");
    else $label.add($check).attr("role", "button");
}

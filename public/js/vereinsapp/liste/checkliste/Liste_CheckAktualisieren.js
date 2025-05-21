function Liste_CheckAktualisieren($check, element_id, disabled, liste) {
    const $element = $check.closest('.element[data-liste="' + liste + '"][data-element_id="' + element_id + '"]');
    const $label = $check.closest("label");

    let check_element_array;
    if ($element.exists())
        check_element_array = Liste_TabelleGefiltertZurueck(
            {
                [LISTEN[liste].element + "_id"]: { inklusiv: [Number(element_id)] },
                [LISTEN[$element.attr("data-gegen_liste")].element + "_id"]: { inklusiv: [Number($element.attr("data-gegen_element_id"))] },
            },
            LISTEN[$check.attr("data-checkliste")].tabelle,
            $check.attr("data-checkliste")
        );
    else check_element_array = new Array();

    // Check setzen
    $check.attr("checked", check_element_array.length > 0);

    // Label mit dem Check verknüpfen
    $check.attr("id", element_id).val(element_id);
    $label.attr("for", element_id);

    // Check ggf. ausgrauen
    $label.add($check).attr("disabled", disabled);
    if (disabled) $label.add($check).removeAttr("role");
    else $label.add($check).attr("role", "button");
}

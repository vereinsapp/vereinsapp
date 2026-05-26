function Liste_VerknuepfungIdsNachListeZurueck(verknuepfte_element_id, verknuepfte_liste, verknuepfungen, wert_nicht_gefunden) {
    let verknuepfungen_ids_nach_liste_zurueck;

    if (
        verknuepfte_liste in VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste &&
        typeof VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[verknuepfte_liste][verknuepfte_element_id] !== "undefined"
    )
        verknuepfungen_ids_nach_liste_zurueck = VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[verknuepfte_liste][verknuepfte_element_id];
    else verknuepfungen_ids_nach_liste_zurueck = wert_nicht_gefunden;

    return verknuepfungen_ids_nach_liste_zurueck;
}

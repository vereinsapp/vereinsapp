function Aufgaben_AufgabeMitgliedAusplanen(bestaetigung_einfordern, dom, title, aufgabe_id) {
    if (typeof aufgabe_id !== "undefined") aufgabe_id = Number(aufgabe_id);
    else if (typeof data.aufgabe_id !== "undefined") aufgabe_id = Number(data.aufgabe_id);
    // else aufgabe_id = undefined;

    if (bestaetigung_einfordern) {
        const mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", aufgabe_id, "aufgaben", null);

        let nachricht;
        if (mitglied_id == ICH["id"]) nachricht = "dich";
        else nachricht = Liste_ElementBeschriftungZurueck(mitglied_id, "mitglieder");

        Schnittstelle_DomBestaetigungEinfordern(
            "Willst du wirklich " +
                nachricht +
                " nicht mehr für die Aufgabe " +
                Liste_ElementBeschriftungZurueck(aufgabe_id, "aufgaben") +
                " einplanen?",
            title,
            "btn_aufgabe_mitglied_ausplanen",
            { aufgabe_id: aufgabe_id }
        );
    } else Aufgaben_AufgabeAendern(false, dom, { mitglied_id: null }, undefined, aufgabe_id);
}

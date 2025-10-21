function Aufgaben_AufgabeMitgliedEinplanen(auswahl_einfordern, bestaetigung_einfordern, dom, data, title, aufgabe_id) {
    if (typeof aufgabe_id !== "undefined") aufgabe_id = Number(aufgabe_id);
    else if (typeof data.aufgabe_id !== "undefined") aufgabe_id = Number(data.aufgabe_id);
    // else aufgabe_id = undefined;

    if (auswahl_einfordern)
        Liste_ElementAuswahlEinfordern($(), title, "mitglieder", "btn_aufgabe_mitglied_einplanen", {
            gegen_liste: "aufgaben",
            gegen_element_id: aufgabe_id,
        });
    else if (bestaetigung_einfordern)
        Schnittstelle_DomBestaetigungEinfordern(
            "Willst du wirklich dich für die Aufgabe " + Liste_ElementBeschriftungZurueck(aufgabe_id, "aufgaben") + " einplanen?",
            title,
            "btn_aufgabe_mitglied_einplanen",
            { aufgabe_id: aufgabe_id, element_id: ICH["id"] }
        );
    else {
        let mitglied_id;
        if (typeof data.mitglied_id !== "undefined") mitglied_id = Number(data.mitglied_id);
        else mitglied_id = null;

        Aufgaben_AufgabeAendern(false, dom, { mitglied_id: mitglied_id }, undefined, aufgabe_id);
    }
}

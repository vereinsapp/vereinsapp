/**
 * @param {JQuery} $quelle
 * @param {JQuery} $ziel
 */

function Schnittstelle_Dom$Quelle$ZielEntknuepfen($quelle, $ziel) {
    if (typeof $quelle !== "undefined" && $quelle.exists()) $quelle.removeAttr("data-ziel_id");
    else Schnittstelle_LogInDieKonsole("Schnittstelle_Dom$Quelle$ZielEntknuepfen: Quelle nicht gefunden!");

    if (typeof $ziel !== "undefined" && $ziel.exists()) $ziel.removeAttr("id");
    else Schnittstelle_LogInDieKonsole("Schnittstelle_Dom$Quelle$ZielEntknuepfen: Ziel nicht gefunden!");
}

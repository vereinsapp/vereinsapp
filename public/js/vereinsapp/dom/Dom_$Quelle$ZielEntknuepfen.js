/**
 * @param {JQuery} $quelle
 * @param {JQuery} $ziel
 */

function Dom_$Quelle$ZielEntknuepfen($quelle, $ziel) {
    if (typeof $quelle !== "undefined" && $quelle.exists()) $quelle.removeAttr("ziel_id");
    else Log_InDieKonsole("Dom_$Quelle$ZielEntknuepfen: Quelle nicht gefunden!");

    if (typeof $ziel !== "undefined" && $ziel.exists()) $ziel.removeAttr("id");
    else Log_InDieKonsole("Dom_$Quelle$ZielEntknuepfen: Ziel nicht gefunden!");
}

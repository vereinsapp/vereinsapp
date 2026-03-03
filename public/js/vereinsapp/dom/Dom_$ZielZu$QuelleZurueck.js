/**
 * @param {JQuery} $quelle
 */

function Dom_$ZielZu$QuelleZurueck($quelle) {
    if (typeof $quelle !== "undefined" && $quelle.exists()) {
        const $ziel = $("#" + $quelle.attr("ziel_id"));
        if (typeof $ziel !== "undefined" && $ziel.exists()) return $ziel;
        else {
            Log_InDieKonsole("Dom_$ZielZu$QuelleZurueck: Ziel für #" + $quelle.attr("ziel_id") + " nicht gefunden!");
            return $(); // todo: ist das wirklich korrekt?
        }
    } else {
        Log_InDieKonsole("Dom_$ZielZu$QuelleZurueck: Quelle nicht gefunden!");
        return $(); // todo: ist das wirklich korrekt?
    }
}

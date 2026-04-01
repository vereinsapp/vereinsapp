/**
 * @param {JQuery} $ziel
 */

function Dom_$QuelleZu$ZielZurueck($ziel) {
    if (typeof $ziel !== "undefined" && $ziel.exists()) {
        const $quelle = $('[ziel_id="' + $ziel.attr("id") + '"]');
        if (typeof $quelle !== "undefined" && $quelle.exists()) return $quelle;
        else {
            Log_InDieKonsole('Dom_$QuelleZu$ZielZurueck: Quelle für [ziel_id="' + $ziel.attr("id") + '"] nicht gefunden!');
            return $(); // todo: ist das wirklich korrekt?
        }
    } else {
        Log_InDieKonsole("Dom_$QuelleZu$ZielZurueck: Ziel nicht gefunden!");
        return $(); // todo: ist das wirklich korrekt?
    }
}

<li class="auswertung zusammenfassung" data-instanz="<?= $zusammenfassung['instanz']; ?>" data-auswertungen="<?= $zusammenfassung['auswertungen']; ?>" data-liste="<?= $zusammenfassung['liste']; ?>" style="list-style: none;">
    <div class="row g-0">
        <div class="ergebnis_anzahl col-1 h5 float-start text-start" data-status=1></div>
        <div class="col-10 text-center">
            <span class="beschriftung"><?php if( array_key_exists( 'beschriftung', $zusammenfassung ) ) echo $zusammenfassung['beschriftung']; ?></span>
            <?php if( array_key_exists( 'progress', $zusammenfassung ) ) { ?><div class="progress-stacked">
                <div class="progress ergebnis_anzahl" role="progressbar" data-status=1><div class="progress-bar bg-success"></div></div>
                <div class="progress ergebnis_anzahl" role="progressbar" data-status=0><div class="progress-bar bg-danger"></div></div>
            </div><?php } ?>
        </div>
        <div class="ergebnis_anzahl col-1 h5 float-end text-end" data-status=0></div>
    </div>
</li>


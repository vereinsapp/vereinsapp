<div class="btn-group btn-group-sm d-flex stretched-link-unwirksam invisible" role="group" data-liste="rueckmeldungen">
    <button type="button" class="btn btn_rueckmeldung_erstellen btn-outline-success w-25 flex-fill" data-status="1" data-mitglied_id="<?= $mitglied_id ?>">ZUSAGEN</button>
    <button type="button" class="btn btn_bemerkung_aendern formular_oeffnen btn-outline-success flex-fill" data-liste="rueckmeldungen"><i class="bi bi-<?= SYMBOLE['bemerkung']['bootstrap']; ?>"></i></button>
    <button type="button" class="btn btn_rueckmeldung_erstellen btn-outline-danger w-25 flex-fill" data-status="2" data-mitglied_id="<?= $mitglied_id ?>">ABSAGEN</button>
</div>
<div class="rueckmeldung_nicht_eingeladen invisible text-secondary text-center small">Du bist nicht eingeladen und kannst deshalb keine Rückmeldung geben.</div>
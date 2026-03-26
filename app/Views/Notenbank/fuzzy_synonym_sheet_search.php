<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'containers' ); ?>

<?php if( NOTENBANK_VERZEICHNIS != NULL AND !empty(NOTENBANK_VERZEICHNIS) ) { ?><div class="container mb-3">
<?= view( 'Notenbank/verzeichnis_oeffnen' ); ?>
</div><?php } ?>

<style>

	#results a {
		display: block;
		padding: 6px 10px;
		text-decoration: none;
		border-bottom: 1px solid #ddd;
		font-family: monospace;
		word-break: break-word;
		overflow-wrap: anywhere;
		white-space: pre-wrap;
	}

	#results a::after {
		content: "";
		word-break: break-all;
	}
	
	#viewer {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		border: none;
		z-index: 1000;
		visibility: hidden;
		pointer-events: none;
	}
	
	.viewer-active {
		visibility: visible;
		pointer-events: auto;
	}

	/* Toolbar-Grundstruktur: Erst sichtbar, wenn .active-Klasse vorhanden */
	#viewerToolbar {
		position: fixed;
		z-index: 2000;
		display: none; /* Standard: Ausgeblendet */
		gap: 10px;
		padding: 10px;
		/* Mobil: Unten am Bildschirmrand */
		bottom: 20px;
		left: 10px;
		right: 10px;
		grid-template-columns: 1fr 1fr; /* 2-Spalten-Layout am Handy */
	}

	/* Toolbar wird nur angezeigt, wenn sie die Klasse .active hat */
	#viewerToolbar.active {
		display: grid; 
	}

	/* Tablet & Desktop: Toolbar nach oben rechts verschieben */
	@media (min-width: 768px) {
		#viewerToolbar {
			top: 20px;
			right: 20px;
			left: auto;
			bottom: auto;
			display: none; /* Standard bei Desktop aus */
			grid-template-columns: repeat(4, auto); /* Buttons nebeneinander */
		}
		#viewerToolbar.active {
			display: grid;
		}
	}

	.viewer-btn {
		padding: 12px 10px;
		font-size: 14px;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		color: white;
		background: linear-gradient(135deg, #741537, #d6356e);
		box-shadow: 0 4px 10px rgba(0,0,0,0.25);
		transition: all 0.2s ease;
	}

	/* Hover-Effekte für Desktop */
	@media (hover: hover) {
		.viewer-btn:hover { transform: translateY(-2px); }
	}

    /* Der Container liegt über dem Rest der Seite */
    #viewerContainer {
        position: fixed;
        inset: 0;
		top: 60px;
        width: 100vw;
        height: 100vh;
        background-color: #333; /* Dunkler Hintergrund wie beim PDF-Viewer */
        z-index: 1000;
        visibility: hidden;
        overflow-y: auto; /* Ermöglicht das Scrollen nach unten */
        -webkit-overflow-scrolling: touch;
    }

    /* Das Bild skaliert auf die volle Breite */
    #viewerImg {
        width: 100%;
        height: auto;
        display: block;
    }

    .viewer-active {
        visibility: visible !important;
    }

    /* Druck-Optimierung: Nur das Bild drucken */
    @media print {
        body * { visibility: hidden; }
        #viewerContainer, #viewerContainer *, #viewerImg { 
            visibility: visible; 
            position: absolute;
            left: 0; top: 0;
            width: 100%;
        }
    }
	
	/* Der Lade-Container */
	#viewerLoader {
		position: fixed;
		inset: 0;
		display: none; /* Standardmäßig aus */
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.5); /* Leicht abgedunkelt */
		z-index: 1500;
		color: white;
		flex-direction: column;
		gap: 15px;
	}

	/* Der eigentliche Kringel */
	.spinner {
		width: 50px;
		height: 50px;
		border: 5px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		border-top-color: #fff;
		animation: spin 1s ease-in-out infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	/* Text unter dem Spinner */
	#viewerLoader span {
		font-family: sans-serif;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 1px;
	}
	
	.custom-mini-text {
		margin-bottom: -40px;
		font-size: 0.75rem;
		display: block;
		color: #6c757d;   
	}
</style>

<div id="viewerLoader">
    <div class="spinner"></div>
    <span>Vorschau wird geladen...</span>
</div>

<div id="viewerContainer">
    <img id="viewerImg" src="" alt="Notenblatt">
</div>

<iframe id="printFrame" style="display:none;"></iframe>

<div id="viewerToolbar">
    <button class="viewer-btn" id="btnBack">Zurück</button>
    <button class="viewer-btn" id="btnDownload">Herunterladen</button>
	<button class="viewer-btn" id="btnPrint">Drucken (Lokal)</button>
    <button class="viewer-btn" id="btnSpool">Im Proberaum drucken</button>
</div>

<div class="container-fluid p-4">
    <input 
        type="text" 
        id="searchBox" 
        class="form-control form-control-lg mb-4" 
        placeholder="Titel, Nr. oder Instrument suchen..."
        autofocus
    >

	<div class="mb-4 d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2">
		<select id="preselection" class="form-select w-auto">
			<option value="" selected>Alle</option>
			<option value=" /nr_titel_stimme/">Nr. Titel Stimme</option>
			<option value=" /stimme/">Stimme</option>
			<option value=" /stimme_nr_titel/">Stimme Nr. Titel</option>
			<option value=" /stimme_titel/">Stimme Titel</option>
			<option value=" /titel_stimme/">Titel Stimme</option>
		</select>
		<div id="instrumentButtons"></div>
	</div>
	
    <div id="results" class="mt-4"></div>
</div>

<script>
		
	let indexData = [];
	let originalIndex = [];
	let indexCount = 0;
	let currentPdf = null;
	let realPdfForDownload = "";
	const searchBox = document.getElementById("searchBox");
	const preselectionDropdown = document.getElementById("preselection");
	const resultsDiv = document.getElementById("results");
	const instrumentButtonsDiv = document.getElementById("instrumentButtons");
	const instruments = ["_C_", "_F_", "_ES_", "_B_", "Posaune", "Horn", "Klarinette", "Schlagzeug", "Flöte", "Trompete", "Tenorhorn", "Bass", "Flügelhorn", "Saxophon", "Gesang", "Direktion"];
	const synonymGroups = [
		["schlagzeug", "drums", "drumset", "percussion", "glockenspiel", "mallets"],
		["klarinette", "clarinet", "schwarzwurzel"],
		["posaune", "trombone"],
		["trompete", "trumpet", "flügelhorn", "flugelhorn", "cornet"],
		["querflöte", "flute", "piccolo", "floete"],
		["bass", "tuba"],
		["e-bass", "stringbass", "kontrabass", "electric bass"],
		["horn", "waldhorn", "english"],
		["tenorhorn", "bariton", "euphonium"],
		["es-","eb-","eb_"],
		["gesang","vocals","text"],
		["direktion","partitur","score"],
		["_Bb","_B_"]
	];
	const viewerContainer = document.getElementById("viewerContainer");
	const viewerImg = document.getElementById("viewerImg");
	const toolbar = document.getElementById("viewerToolbar");
	const loader = document.getElementById("viewerLoader");
	

	function levenshtein(a, b) {
		const matrix = [];
		for (let i = 0; i <= b.length; i++) matrix[i] = [i];
		for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
		for (let i = 1; i <= b.length; i++) {
			for (let j = 1; j <= a.length; j++) {
				if (b.charAt(i - 1) === a.charAt(j - 1)) {
					matrix[i][j] = matrix[i - 1][j - 1];
				} else {
					matrix[i][j] = Math.min(
						matrix[i - 1][j - 1] + 1,
						matrix[i][j - 1] + 1,
						matrix[i - 1][j] + 1
					);
				}
			}
		}
		return matrix[b.length][a.length];
	}

	instruments.sort((a,b) => a.localeCompare(b, 'de'));

	instruments.forEach(instr => {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.className = "btn btn-sm btn-outline-primary me-2 mb-2";
		btn.textContent = instr;
		btn.addEventListener("click", () => {
			let current = searchBox.value.trim();
			if(current) current += " ";
			searchBox.value = current + instr + " ";
			searchBox.dispatchEvent(new Event("input"));
			searchBox.focus();
		});
		instrumentButtonsDiv.appendChild(btn);
	});

    if(typeof BASE_URL === "undefined") {
        try {
            BASE_URL = "";
        }
        catch(e) {
            console.log("BASE_URL is strictly constant and can not be changed.");
        }
    }
	fetch(BASE_URL+"/storage/index.txt")		// wird stündlich aktualisiert vom cron
		.then(response => response.text())
		.then(text => {
			const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
			originalIndex = [...lines];

			indexData = lines.map(line => {
				const lowerLine = line.toLowerCase();
				let expanded = [lowerLine];

				synonymGroups.forEach(group => {
					if (group.some(word => lowerLine.includes(word))) {
						expanded.push(...group);
					}
				});

				expanded = [...new Set(expanded)];
				return expanded.join(" ");
			});

			console.log("Index geladen:", indexData.length, "Einträge mit Synonymen");

			document.getElementById('display-count').textContent = indexData.length;
		});


	searchBox.addEventListener("input", function () {
		rundog();
	});
	
	preselectionDropdown.addEventListener("change", function () {
		rundog();
	});
	
	function rundog() {
		const query = searchBox.value.toLowerCase().trim() + preselectionDropdown.value;
		resultsDiv.innerHTML = "";
		if (!query) return;

		const terms = query.split(/\s+/);
		const FUZZY_THRESHOLD = 1; //2; weniger = weniger treffer
		const FUZZY_MIN_LENGTH = 4;
		const seenPaths = new Set();

		const matches = indexData.filter((line, idx) => {
			const words = line.split(/\s+/);

			const match = terms.every(term => {
				if (words.some(w => w.includes(term))) return true;
				if (term.length >= FUZZY_MIN_LENGTH) {
					return words.some(w => levenshtein(term, w) <= FUZZY_THRESHOLD);
				}
				return false;
			});

			return match;
		});

		if (matches.length === 0) {
			resultsDiv.innerHTML = "<div class='text-muted'>Keine Treffer</div>";
			return;
		}

		const fragment = document.createDocumentFragment();
		
		matches.slice(0, 500).forEach(match => {	//nur 500 ergebnisse
		//matches.forEach(match => {
			const idx = indexData.indexOf(match);
			const originalPath = originalIndex[idx];

			if (seenPaths.has(originalPath)) return;
			seenPaths.add(originalPath);

			const a = document.createElement("a");
			const visiblepath = originalPath.replace(/notenbank\/|notenarchiv\//g, "");
			const previewUrl = "/storage/pdf2png.php?file=" + originalPath;
			const pdfDownloadUrl = "/storage/" + originalPath;
			
			a.href = "#";
			a.textContent = visiblepath;

			a.addEventListener("click", function (e) {
				e.preventDefault();
				loader.style.display = "flex";
				viewerImg.src = previewUrl;
				realPdfForDownload = pdfDownloadUrl;
				viewerContainer.classList.add("viewer-active");
				toolbar.classList.add("active");
				viewerContainer.scrollTop = 0;
			});

			viewerImg.onload = function() {
				loader.style.display = "none";
			};

			viewerImg.onerror = function() {
				if (!viewerImg.getAttribute('src') || viewerImg.getAttribute('src') === "") return;
				loader.style.display = "none";
				console.error("Fehler beim Laden von: " + viewerImg.src);
				alert("Fehler beim Laden der Vorschau.");
			};

			fragment.appendChild(a);
		});

		resultsDiv.appendChild(fragment);
		
	}

	document.getElementById("btnBack").onclick = function () {
		viewerContainer.classList.remove("viewer-active");
		toolbar.classList.remove("active");
		viewerImg.src = "";
	};

	document.getElementById("btnPrint").onclick = function () {
		if (!realPdfForDownload) return;

		const printFrame = document.getElementById("printFrame");
		
		loader.style.display = "flex";
		loader.querySelector('span').textContent = "Druckvorbereitung...";

		printFrame.src = realPdfForDownload;

		printFrame.onload = function() {
			loader.style.display = "none";
			loader.querySelector('span').textContent = "Vorschau wird geladen..."; // Text zurücksetzen
			
			try {
				printFrame.contentWindow.focus();
				printFrame.contentWindow.print();
			} catch (e) {
				window.open(realPdfForDownload, '_blank');
			}
		};
	};
	
	document.getElementById("btnDownload").onclick = function () {
		if (!realPdfForDownload) return;
		
		const a = document.createElement("a");
		a.href = realPdfForDownload;
		
		const fileName = realPdfForDownload.split('/').pop();
		a.download = fileName;
		
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};
	
	document.getElementById("btnSpool").onclick = function () {
		if (!realPdfForDownload) return;

		const btn = this;
		const originalText = btn.textContent;
		
		btn.textContent = "Sende...";
		btn.disabled = true;

		const formData = new FormData();
		formData.append('file', realPdfForDownload);

		fetch('/storage/spool.php', {		//druckprozess mit raspi im proberaum
			method: 'POST',
			body: formData
		})
		.then(response => {
			if (response.ok) {
				btn.textContent = "Gesendet!";
				btn.style.background = "linear-gradient(135deg, #28a745, #218838)";
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			btn.textContent = "Fehler";
			btn.style.background = "linear-gradient(135deg, #dc3545, #c82333)";
		})
		.finally(() => {
			setTimeout(() => {
				btn.textContent = originalText;
				btn.disabled = false;
				btn.style.background = "";
			}, 3000);
		});
	};

</script>



<div class="container mb-3 text-center">
    <small class="custom-mini-text">indizierte Scans: <span id="display-count"></span></small>
</div>

<?= $this->endSection() ?>
document.addEventListener('DOMContentLoaded', function() {
    const qtdParedesInput = document.getElementById('qtdParedes');
    const paredesContainer = document.getElementById('paredesContainer');
    const calcularBtn = document.getElementById('calcular');
    const resultadoDiv = document.getElementById('resultado');
    const areaTotalSpan = document.getElementById('areaTotal');
    const litrosNecessariosSpan = document.getElementById('litrosNecessarios');
    const opcoesCompraSpan = document.getElementById('opcoesCompra');
    
    // Função para criar inputs de largura baseado na quantidade de paredes
    qtdParedesInput.addEventListener('input', function() {
        const qtdParedes = parseInt(this.value) || 0;
        paredesContainer.innerHTML = '';
        
        for (let i = 1; i <= qtdParedes; i++) {
            const div = document.createElement('div');
            div.className = 'form-group';
            div.innerHTML = `
                <label for="largura${i}">Largura da parede ${i} (metros):</label>
                <input type="number" id="largura${i}" min="0.1" step="0.1" required>
            `;
            paredesContainer.appendChild(div);
        }
    });
    
    // Função para calcular a quantidade de tinta necessária
    calcularBtn.addEventListener('click', function() {
        const altura = parseFloat(document.getElementById('altura').value);
        const qtdParedes = parseInt(qtdParedesInput.value);
        
        if (!altura || altura <= 0 || !qtdParedes || qtdParedes <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }
        
        let areaTotal = 0;
        
        // Calcular a área de cada parede e somar
        for (let i = 1; i <= qtdParedes; i++) {
            const larguraInput = document.getElementById(`largura${i}`);
            if (!larguraInput) continue;
            
            const largura = parseFloat(larguraInput.value);
            if (largura && largura > 0) {
                areaTotal += altura * largura;
            }
        }
        
        if (areaTotal <= 0) {
            alert('Por favor, preencha as larguras das paredes corretamente.');
            return;
        }
        
        // Calcular a quantidade de tinta necessária (considerando 2 demãos)
        // 3,6L cobrem 15m² com 2 demãos, então 1L cobre 4,166m² com 2 demãos
        const litrosNecessarios = areaTotal / (15 / 3.6);
        
        // Calcular as opções de latas
        const lataPequenaCapacidade = 3.6; // litros
        const lataGrandeCapacidade = 18; // litros
        
        // Calcular quantas latas de cada tipo seriam necessárias
        const latasPequenas = Math.ceil(litrosNecessarios / lataPequenaCapacidade);
        const latasGrandes = Math.floor(litrosNecessarios / lataGrandeCapacidade);
        const restoLitros = litrosNecessarios % lataGrandeCapacidade;
        
        let opcoesTexto = '';
        
        // Opção 1: Apenas latas pequenas
        opcoesTexto += `<p>• ${latasPequenas} lata(s) de 3,6L</p>`;
        
        // Opção 2: Combinar latas grandes e pequenas (se aplicável)
        if (latasGrandes > 0) {
            const latasPequenasParaResto = Math.ceil(restoLitros / lataPequenaCapacidade);
            opcoesTexto += `<p>• ${latasGrandes} lata(s) de 18L`;
            
            if (latasPequenasParaResto > 0) {
                opcoesTexto += ` + ${latasPequenasParaResto} lata(s) de 3,6L`;
            }
            
            opcoesTexto += `</p>`;
        }
        
        // Exibir os resultados
        areaTotalSpan.textContent = areaTotal.toFixed(2);
        litrosNecessariosSpan.textContent = litrosNecessarios.toFixed(2);
        opcoesCompraSpan.innerHTML = opcoesTexto;
        
        resultadoDiv.style.display = 'block';
    });
});
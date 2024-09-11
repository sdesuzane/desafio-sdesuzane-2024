class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, biomas: ['savana'] },
        LEOPARDO: { tamanho: 2, biomas: ['savana'] },
        CROCODILO: { tamanho: 3, biomas: ['rio'] },
        MACACO: { tamanho: 1, biomas: ['savana', 'floresta'] },
        GAZELA: { tamanho: 2, biomas: ['savana'] },
        HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'] }
      };
    }
  
    analisaRecintos(animal, quantidade) {
      // validação dos animal e quantidade
      if (!this.animais[animal]) {
        return { erro: 'Animal inválido' };
      }
  
      if (typeof quantidade !== 'number' || quantidade <= 0) {
        return { erro: 'Quantidade inválida' };
      }
  
      const { tamanho, biomas } = this.animais[animal];
      const tamanhoTotal = tamanho * quantidade;
  
      // filtrar os recintos viáveis
      const recintosViaveis = this.recintos
        .filter(recinto => this.recintoEhViavel(recinto, animal, biomas, tamanhoTotal, quantidade))
        .map(recinto => this.formataRecinto(recinto, animal, tamanhoTotal));
  
      if (recintosViaveis.length === 0) {
        return { erro: 'Não há recinto viável' };
      }
  
      return { recintosViaveis };
    }
  
    recintoEhViavel(recinto, animal, biomas, tamanhoTotal, quantidade) {
      // verificar se o bioma é compatível
      const biomaCompativel = biomas.includes(recinto.bioma) || (recinto.bioma.includes('savana') && recinto.bioma.includes('rio'));
  
      if (!biomaCompativel) {
        return false;
      }
  
      // verificar se tem espaço suficiente
      let espacoOcupado = recinto.animais.reduce((total, a) => total + this.animais[a.especie].tamanho * a.quantidade, 0);
      const espacoExtra = recinto.animais.length > 0 && recinto.animais[0].especie !== animal ? 1 : 0;
      const espacoDisponivel = recinto.tamanho - espacoOcupado - espacoExtra;
  
      if (espacoDisponivel < tamanhoTotal) {
        return false;
      }
  
      // regra de carnívoros e hipopótamos
      const carnivoro = ['LEAO', 'LEOPARDO','CROCODILO'].includes(animal);
      const carnivoroNoRecinto = recinto.animais.some(a => ['LEAO', 'LEOPARDO','CROCODILO'].includes(a.especie));

      if (carnivoroNoRecinto && recinto.animais.some(a => a.especie !== animal)) {
        return false;
      }
  
      if (carnivoro && (recinto.animais.length > 0 && recinto.animais[0].especie !== animal)) {
        return false;
      }
  
      if (animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
        return false;
      }

      if (recinto.animais.some(a => a.especie === 'HIPOPOTAMO') && recinto.bioma !== 'savana e rio') {
        return false;
      }
  
      return true;
    }
  
    formataRecinto(recinto, animal, tamanhoTotal) {
      const espacoOcupado = recinto.animais.reduce((total, a) => total + this.animais[a.especie].tamanho * a.quantidade, 0);
      const espacoExtra = recinto.animais.length > 0 && recinto.animais[0].especie !== animal ? 1 : 0;
      const espacoDisponivel = recinto.tamanho - espacoOcupado - espacoExtra - tamanhoTotal;
  
      return `Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel} total: ${recinto.tamanho})`;
    }
  }

  export { RecintosZoo as RecintosZoo };

  
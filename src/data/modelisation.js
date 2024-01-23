class AverageLengthModel {
  constructor(data) {
    this.data = data;
  }
  getFormattedData() {
    const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    return this.data.map((session, index) => ({
      day: daysOfWeek[index],
      sessionLength: session.sessionLength,
    }));
  }
}

class DailyActivityModel {
  constructor(data) {
    this.data = data;
  }

  getFormattedData() {
    //... = opérateur de décomposition. Il est utilisé pour décomposer le tableau résultant de map en une liste d'arguments.
    //En d'autres termes, ... est utilisé pour dire à JavaScript de traiter chaque élément du tableau comme un argument individuel, plutôt que de passer le tableau entier en tant qu'unique argument.
    //Par exemple, si le tableau retourné est [69, 70, 81], ça signifie que map doit traiter les éléments 69, 70 et 81 comme des arguments individuels.
    //C'est une syntaxe concise pour fournir plusieurs arguments à une fonction qui attend une liste d'arguments individuels.
    const minWeight = Math.min(...this.data.map((entry) => entry.kilogram)) - 1;
    const maxWeight = Math.max(...this.data.map((entry) => entry.kilogram)) + 1;

    return {
      formattedData: this.data.map((entry) => ({
        day: entry.day,
        kilogram: entry.kilogram,
        calories: entry.calories,
      })),
      minWeight,
      maxWeight,
    };
  }
}

class DiagramModel {
  constructor(data, kind) {
    this.data = data;
    this.kind = kind;
  }

  getFormattedData() {
    const formatKindName = (kind) => {
      if (kind === 'cardio') return 'Cardio';
      if (kind === 'energy') return 'Energie';
      if (kind === 'endurance') return 'Endurance';
      if (kind === 'strength') return 'Force';
      if (kind === 'speed') return 'Vitesse';
      if (kind === 'intensity') return 'Intensité';
      return kind;
    };

    // Reversing the data in order to display it from 6 to 1 (6. intensity, 5. speed, ...)
    // slice() returns a copy of the array
    const reversedData = this.data.slice().reverse();

    return reversedData.map((dataEntry) => ({
      kind: formatKindName(this.kind[dataEntry.kind]),
      value: dataEntry.value,
    }));
  }
}

class ScoreModel {
  constructor(userData) {
    this.userScore = userData?.score || userData?.todayScore;
  }

  getChartData() {
    return [
      { name: 'Score', value: this.userScore * 100 },
      { name: 'Score restant', value: 100 - this.userScore * 100 },
    ];
  }
}

export { AverageLengthModel, DailyActivityModel, DiagramModel, ScoreModel };

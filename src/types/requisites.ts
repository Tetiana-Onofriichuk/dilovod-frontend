export interface Requisites {
  id: number;

  // Командир роти
  companyCommanderPosition: string;
  companyCommanderRank: string;
  companyCommanderFirstName: string;
  companyCommanderPatronymic: string;
  companyCommanderLastName: string;
  companyCommanderLastNameGenitive: string;

  // Командир військової частини
  unitCommanderPosition: string;
  unitCommanderRank: string;
  unitCommanderFirstName: string;
  unitCommanderLastName: string;

  // Начальник фінансово-економічної служби
  financeChiefPosition: string;
  financeChiefRank: string;
  financeChiefFirstName: string;
  financeChiefLastName: string;
}

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import type { Soldier } from "../types/soldier";
import type { Requisites } from "../types/requisites";

export type VacationReportData = {
  soldier: Soldier;
  requisites: Requisites;
  days: string;
  travelDays: string;
  startDate: string;
  endDate: string;
  location: string;
  address: string;
  transport: string;
  reportDate: string;
};
const numberToUkrainianWords = (value: string) => {
  const numbers: Record<number, string> = {
    0: "нуль",
    1: "одна",
    2: "дві",
    3: "три",
    4: "чотири",
    5: "п'ять",
    6: "шість",
    7: "сім",
    8: "вісім",
    9: "дев'ять",
    10: "десять",
    11: "одинадцять",
    12: "дванадцять",
    13: "тринадцять",
    14: "чотирнадцять",
    15: "п'ятнадцять",
    16: "шістнадцять",
    17: "сімнадцять",
    18: "вісімнадцять",
    19: "дев'ятнадцять",
    20: "двадцять",
    21: "двадцять одна",
    22: "двадцять дві",
    23: "двадцять три",
    24: "двадцять чотири",
    25: "двадцять п'ять",
    26: "двадцять шість",
    27: "двадцять сім",
    28: "двадцять вісім",
    29: "двадцять дев'ять",
    30: "тридцять",
  };

  return numbers[Number(value)] ?? value;
};

const formatDate = (date: string) => {
  if (!date) {
    return "";
  }

  return new Date(`${date}T00:00:00`).toLocaleDateString("uk-UA");
};
const getRankGenitive = (rank: string) => {
  const ranks: Record<string, string> = {
    рекрут: "рекрута",
    солдат: "солдата",
    "старший солдат": "старшого солдата",

    "молодший сержант": "молодшого сержанта",
    сержант: "сержанта",
    "старший сержант": "старшого сержанта",
    "головний сержант": "головного сержанта",
    "штаб-сержант": "штаб-сержанта",

    "майстер-сержант": "майстер-сержанта",
    "старший майстер-сержант": "старшого майстер-сержанта",
    "головний майстер-сержант": "головного майстер-сержанта",

    "молодший лейтенант": "молодшого лейтенанта",
    лейтенант: "лейтенанта",
    "старший лейтенант": "старшого лейтенанта",
    капітан: "капітана",
    майор: "майора",
    підполковник: "підполковника",
    полковник: "полковника",
  };

  const normalizedRank = rank.trim().toLowerCase();

  return ranks[normalizedRank] ?? rank;
};

export const generateVacationReport = async (data: VacationReportData) => {
  const {
    soldier,
    requisites,
    days,
    travelDays,
    startDate,
    address,
    transport,
    reportDate,
  } = data;

  try {
    const response = await fetch("/templates/vacation-report-template.docx");

    if (!response.ok) {
      throw new Error("Не вдалося завантажити шаблон рапорту");
    }

    const template = await response.arrayBuffer();

    const zip = new PizZip(template);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: {
        start: "{{",
        end: "}}",
      },
    });

    const fullName = `${soldier.lastName} ${soldier.firstName} ${soldier.patronymic}`;

    const lastNameUpper = soldier.lastName.toUpperCase();

    const initials = `${soldier.firstName.charAt(0)}.${soldier.patronymic.charAt(0)}.`;

    const reportYear = new Date(`${reportDate}T00:00:00`).getFullYear();

    doc.render({
      days,
      daysWords: numberToUkrainianWords(days),

      travelDays,
      travelDaysWords: numberToUkrainianWords(travelDays),

      startDate: formatDate(startDate),

      transport,
      address,
      phone: soldier.phone,

      lastName: soldier.lastName,
      lastNameUpper,

      firstName: soldier.firstName,
      patronymic: soldier.patronymic,
      fullName,
      initials,

      rank: soldier.rank,
      position: soldier.position,
      platoon: soldier.platoon,
      squad: soldier.squad,

      reportDate: formatDate(reportDate),
      reportYear,

      rankGenitive: getRankGenitive(soldier.rank),
      lastNameGenitive: soldier.lastNameGenitive,

      companyCommanderPosition: requisites.companyCommanderPosition,
      companyCommanderRank: requisites.companyCommanderRank,
      companyCommanderFirstName: requisites.companyCommanderFirstName,
      companyCommanderLastName: requisites.companyCommanderLastName,

      unitCommanderPosition: requisites.unitCommanderPosition,
      unitCommanderRank: requisites.unitCommanderRank,
      unitCommanderFirstName: requisites.unitCommanderFirstName,
      unitCommanderLastName: requisites.unitCommanderLastName,
    });

    const blob = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    saveAs(blob, `Рапорт_${soldier.lastName}_${formatDate(reportDate)}.docx`);
  } catch (error) {
    console.error("Помилка створення рапорту:", error);

    throw error;
  }
};

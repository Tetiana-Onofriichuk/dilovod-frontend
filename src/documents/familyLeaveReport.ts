import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import type { Soldier } from "../types/soldier";
import type { Requisites } from "../types/requisites";

export type FamilyLeaveReportData = {
  soldier: Soldier;
  requisites: Requisites;
  leaveReason: string;
  days: string;
  startDate: string;
  address: string;
  attachment: string;
  reportDate: string;
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

export const generateFamilyLeaveReport = async (
  data: FamilyLeaveReportData,
) => {
  const {
    soldier,
    requisites,
    leaveReason,
    days,
    startDate,
    address,
    attachment,
    reportDate,
  } = data;

  try {
    const response = await fetch(
      "/templates/family-leave-report-template.docx",
    );

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
      // Дані відпустки
      leaveReason,
      days,
      startDate: formatDate(startDate),
      address,
      attachment,

      // Дані військовослужбовця
      phone: soldier.phone,

      lastName: soldier.lastName,
      lastNameUpper,
      lastNameGenitive: soldier.lastNameGenitive,

      firstName: soldier.firstName,
      patronymic: soldier.patronymic,
      fullName,
      initials,

      rank: soldier.rank,
      rankGenitive: getRankGenitive(soldier.rank),

      position: soldier.position,
      platoon: soldier.platoon,
      squad: soldier.squad,

      // Дата рапорту
      reportDate: formatDate(reportDate),
      reportYear,

      // Командир роти
      companyCommanderPosition: requisites.companyCommanderPosition,
      companyCommanderRank: requisites.companyCommanderRank,
      companyCommanderFirstName: requisites.companyCommanderFirstName,
      companyCommanderLastName: requisites.companyCommanderLastName,

      // Командир військової частини
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

    saveAs(
      blob,
      `Рапорт_сімейна_відпустка_${soldier.lastName}_${formatDate(
        reportDate,
      )}.docx`,
    );
  } catch (error) {
    console.error(
      "Помилка створення рапорту на відпустку за сімейними обставинами:",
      error,
    );

    throw error;
  }
};

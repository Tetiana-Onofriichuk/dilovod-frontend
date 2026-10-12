export type DocumentTemplateCategory =
  | "leave"
  | "finance"
  | "training"
  | "other";

export type DocumentTemplate = {
  id: string;
  title: string;
  description: string;
  category: DocumentTemplateCategory;
};

export const documentTemplates: DocumentTemplate[] = [
  {
    id: "vacation",
    title: "Рапорт на відпустку",
    description: "Рапорт на щорічну основну відпустку",
    category: "leave",
  },
  {
    id: "family-leave",
    title: "Рапорт на відпустку за сімейними обставинами",
    description: "Рапорт на відпустку за сімейними обставинами",
    category: "leave",
  },
  {
    id: "bank-details",
    title: "Рапорт про банківські реквізити",
    description: "Надання або зміна банківських реквізитів",
    category: "finance",
  },
  {
    id: "training-with-weapon",
    title: "Рапорт на навчання зі зброєю",
    description: "Направлення військовослужбовців на навчання зі зброєю",
    category: "training",
  },
  {
    id: "training-without-weapon",
    title: "Рапорт на навчання без зброї",
    description: "Направлення військовослужбовців на навчання без зброї",
    category: "training",
  },
];

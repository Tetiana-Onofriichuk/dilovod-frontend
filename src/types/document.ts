export interface DocumentSoldier {
  id: number;
  lastName: string;
  firstName: string;
  patronymic: string;
}

export interface Document {
  id: number;
  title: string;
  type: string;
  soldiers: DocumentSoldier[];
  fileName: string;
  createdAt: string;
}

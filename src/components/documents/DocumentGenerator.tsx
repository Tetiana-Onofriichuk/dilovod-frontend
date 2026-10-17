import type { Soldier } from "../../types/soldier";
import type { DocumentTemplate } from "../../config/documentTemplates";

import VacationReportModal from "./VacationReportModal";
import FamilyLeaveReportModal from "./FamilyLeaveReportModal";
import BankDetailsReportModal from "./BankDetailsReportModal";
import TrainingWithWeaponReportModal from "./TrainingWithWeaponReportModal";
import TrainingWithoutWeaponReportModal from "./TrainingWithoutWeaponReportModal";
import PositionAcceptanceReportModal from "./PositionAcceptanceReportModal";

type DocumentGeneratorProps = {
  template: DocumentTemplate;
  soldier: Soldier;
  onClose: () => void;
};

const DocumentGenerator = ({
  template,
  soldier,
  onClose,
}: DocumentGeneratorProps) => {
  switch (template.id) {
    case "vacation":
      return <VacationReportModal soldier={soldier} onClose={onClose} />;

    case "family-leave":
      return <FamilyLeaveReportModal soldier={soldier} onClose={onClose} />;

    case "bank-details":
      return <BankDetailsReportModal soldier={soldier} onClose={onClose} />;

    case "training-with-weapon":
      return (
        <TrainingWithWeaponReportModal soldier={soldier} onClose={onClose} />
      );

    case "training-without-weapon":
      return (
        <TrainingWithoutWeaponReportModal soldier={soldier} onClose={onClose} />
      );
    case "position-acceptance":
      return (
        <PositionAcceptanceReportModal soldier={soldier} onClose={onClose} />
      );

    default:
      return null;
  }
};

export default DocumentGenerator;

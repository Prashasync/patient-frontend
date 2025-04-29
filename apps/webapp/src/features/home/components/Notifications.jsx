import appointmentConfirm from "../../../assets/icons/Appointmentconfirm.svg";
import questionnaireIcon from "../../../assets/icons/questionnaire-icon.svg";
import weeklyReport from "../../../assets/icons/weeklyReport.png";
import remainder from "../../../assets/icons/remainder.svg";
import rightArrow from "../../../assets/icons/right_line.svg";
import "../../../shared/styles/notifications.css"

const notifications = [
  {
    icon: appointmentConfirm,
    title: "Appointment is confirmed",
    subtitle: "Your appointment is confirmed with Dr. Mathew",
  },
  {
    icon: questionnaireIcon,
    title: "Mental health questionnaires",
    subtitle: "Boost your mood with quick questionnaires",
  },
  {
    icon: weeklyReport,
    title: "Weekly Report",
    subtitle: "Your weekly report is ready!",
  },
  {
    icon: remainder,
    title: "Medication reminder",
    subtitle: "Your medication reminder",
  },
];

const Notifications = () => {
  return (
    <div className="space-y-4 mt-6 overflow-y-auto">
      {notifications.map((item, index) => (
        <div
          key={index}
          className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <img src={item.icon} alt={item.title} className="w-10 h-10" />
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">{item.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.subtitle}</p>
          </div>
          <img src={rightArrow} alt="Go" className="w-4 h-4" />
        </div>
      ))}
    </div>
  );
};

export default Notifications


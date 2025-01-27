// Importing icon libraries (e.g., FontAwesome or Material Icons)
import { FaHome, FaCalendarAlt, FaUserMd, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';

const sidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <FaHome /> // Home icon from react-icons
  },
  {
    title: 'Appointments',
    path: '/appointments',
    icon: <FaCalendarAlt /> // Calendar icon for appointments
  },
  {
    title: 'Apply Doctor',
    path: '/apply-doctor',
    icon: <FaUserMd /> // Doctor icon for applying as a doctor
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <FaUserAlt /> // User icon for profile
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <FaSignOutAlt /> // Logout icon
  }
];

export default sidebarData;

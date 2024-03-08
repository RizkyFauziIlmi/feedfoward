import { FaUserEdit } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { GoOrganization } from "react-icons/go";
import { HiOutlineUsers } from "react-icons/hi";
import { LiaSearchLocationSolid } from "react-icons/lia";
import { MdOutlineFeedback } from "react-icons/md";

export const LandingFeatures = () => {
  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-10 md:py-12 md:h-screen w-screen px-12 md:px-24"
      id="features"
    >
      <div className="border-2 shadow-md rounded-lg p-4">
        <div className="flex items-center justify-center p-2 mb-3 w-fit bg-slate-500/30 rounded-lg">
          <FaUserEdit className="w-6 h-6" />
        </div>
        <div className="text-lg font-semibold mb-1">User Profiles</div>
        <p className="text-sm text-muted-foreground">
          Personalized dashboards where users can track their donation history,
          preferences, and impact over time.
        </p>
      </div>
      <div className="border-2 shadow-md rounded-lg p-4">
        <div className="flex items-center justify-center p-2 mb-3 w-fit bg-red-500/30 rounded-lg">
          <GoOrganization className="w-6 h-6" />
        </div>
        <div className="text-lg font-semibold mb-1">Verified Organizations</div>
        <p className="text-sm text-muted-foreground">
          Assurance of credibility through a vetting process for organizations
          accepting donations.
        </p>
      </div>
      <div className="border-2 shadow-md rounded-lg p-4">
        <div className="flex items-center justify-center p-2 mb-3 w-fit bg-blue-500/30 rounded-lg">
          <MdOutlineFeedback className="w-6 h-6" />
        </div>
        <div className="text-lg font-semibold mb-1">Feedback Loop</div>
        <p className="text-sm text-muted-foreground">
          Channels for users to provide feedback and suggestions, ensuring
          continuous improvement of the platform.
        </p>
      </div>
      <div className="border-2 shadow-md rounded-lg p-4">
        <div className="flex items-center justify-center p-2 mb-3 w-fit bg-orange-500/30 rounded-lg">
          <GiReceiveMoney className="w-6 h-6" />
        </div>
        <div className="text-lg font-semibold mb-1">Easy Donation</div>
        <p className="text-sm text-muted-foreground">
          Users can effortlessly donate surplus food items with minimal effort.
        </p>
      </div>
      <div className="border-2 shadow-md rounded-lg p-4">
        <div className="flex items-center justify-center p-2 mb-3 w-fit bg-green-500/30 rounded-lg">
          <LiaSearchLocationSolid className="w-6 h-6" />
        </div>
        <div className="text-lg font-semibold mb-1">
          Location-Based Matching
        </div>
        <p className="text-sm text-muted-foreground">
          Matching donors with nearby organizations or institutions that accept
          food donations based on their location.
        </p>
      </div>
      <div className="border-2 shadow-md rounded-lg p-4">
        <div className="flex items-center justify-center p-2 mb-3 w-fit bg-yellow-500/30 rounded-lg">
          <HiOutlineUsers className="w-6 h-6" />
        </div>
        <div className="text-lg font-semibold mb-1">Community Engagement</div>
        <p className="text-sm text-muted-foreground">
          Fostering a sense of community through social sharing features,
          allowing users to share their donation experiences and inspire others.
        </p>
      </div>
    </section>
  );
};

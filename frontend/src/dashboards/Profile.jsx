import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";

const ProfileView = () => {
  const profile = {
    name: "Lakshith Kumar",
    staffId: "STF10234",
    role: "Staff",
    dob: "15 June 1998",
    bloodGroup: "O+",
    phone: "9876543210",
    email: "lakshith.staff@gmail.com",

    currentAddress: "Kukatpally, Hyderabad, Telangana",
    permanentAddress: "Guntur, Andhra Pradesh",

    experience: "5 Years",
    subjects: "Mathematics, Physics",
    classes: "8th, 9th, 10th",

    fatherName: "Ramesh Kumar",
    motherName: "Saraswathi",
    fatherPhone: "9848012345",
    motherPhone: "9848098765",

    aadhaar: "1234 5678 9012",
    profilePhoto:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-4xl mb-4">
            <BackButton to="/staff/dashboard" />
        </div>
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">


          {/* PROFILE HEADER */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-6 flex items-center gap-6">
            <img
              src={profile.profilePhoto}
              className="w-24 h-24 rounded-full border-4 border-white"
              alt="Profile"
            />
            <div className="text-white">
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-sm mt-1">Staff ID: {profile.staffId}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-700 text-xs font-semibold rounded-full">
                {profile.role}
              </span>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-6 space-y-8">

            <Section title="Personal Information">
              <Row label="Full Name" value={profile.name} />
              <Row label="Date of Birth" value={profile.dob} />
              <Row label="Blood Group" value={profile.bloodGroup} />
              <Row label="Contact Number" value={profile.phone} />
              <Row label="Email" value={profile.email} />
              <Row label="Aadhaar Number" value={profile.aadhaar} />
              <Row label="Current Address" value={profile.currentAddress} />
              <Row label="Permanent Address" value={profile.permanentAddress} />
            </Section>

            <Section title="Professional Information">
              <Row label="Experience" value={profile.experience} />
              <Row label="Subjects Dealt" value={profile.subjects} />
              <Row label="Classes Dealt" value={profile.classes} />
            </Section>

            <Section title="Family Information">
              <Row label="Father Name" value={profile.fatherName} />
              <Row label="Father Mobile" value={profile.fatherPhone} />
              <Row label="Mother Name" value={profile.motherName} />
              <Row label="Mother Mobile" value={profile.motherPhone} />
            </Section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-semibold text-blue-900 border-l-4 border-blue-900 pl-3 mb-4">
      {title}
    </h3>
    <div className="border-2 border-blue-200 rounded-md overflow-hidden">
      {children}
    </div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="grid grid-cols-3 border-b-2 border-blue-100 last:border-b-0">
    <div className="bg-blue-50 px-4 py-3 font-medium text-gray-700 border-r-2 border-blue-100">
      {label}
    </div>
    <div className="col-span-2 px-4 py-3 text-gray-800">
      {value}
    </div>
  </div>
);

export default ProfileView;

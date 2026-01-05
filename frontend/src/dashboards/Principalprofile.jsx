import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";

const ProfileView = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [profile, setProfile] = useState({
    name: "Lakshith Kumar",
    principalId: "prid 10234",
    role: "Principal",
    dob: "15 June 1998",
    bloodGroup: "O+",
    phone: "9876543210",
    email: "lakshith.principal@gmail.com",

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
  });

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = () => {
    console.log("Saved Principal Profile:", profile);
    alert("Profile updated successfully!");
    setIsEdit(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-4xl mb-4">
          <BackButton />
        </div>
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">

          {/* PROFILE HEADER */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src={profile.profilePhoto}
                className="w-24 h-24 rounded-full border-4 border-white"
                alt="Profile"
              />
              <div className="text-white">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-sm mt-1">
                  Principal ID: {profile.principalId}
                </p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-700 text-xs font-semibold rounded-full">
                  {profile.role}
                </span>
              </div>
            </div>

            {/* EDIT / SAVE BUTTONS */}
            {!isEdit ? (
              <button
                onClick={() => setIsEdit(true)}
                className="bg-white text-blue-900 px-4 py-2 rounded font-semibold hover:bg-blue-100"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEdit(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="p-6 space-y-8">

            <Section title="Personal Information">
              <Row label="Full Name" value={profile.name} isEdit={isEdit}
                onChange={(v) => handleChange("name", v)} />
              <Row label="Date of Birth" value={profile.dob} isEdit={isEdit}
                onChange={(v) => handleChange("dob", v)} />
              <Row label="Blood Group" value={profile.bloodGroup} isEdit={isEdit}
                onChange={(v) => handleChange("bloodGroup", v)} />
              <Row label="Contact Number" value={profile.phone} isEdit={isEdit}
                onChange={(v) => handleChange("phone", v)} />
              <Row label="Email" value={profile.email} isEdit={isEdit}
                onChange={(v) => handleChange("email", v)} />
              <Row label="Aadhaar Number" value={profile.aadhaar} isEdit={isEdit}
                onChange={(v) => handleChange("aadhaar", v)} />
              <Row label="Current Address" value={profile.currentAddress} isEdit={isEdit}
                onChange={(v) => handleChange("currentAddress", v)} />
              <Row label="Permanent Address" value={profile.permanentAddress} isEdit={isEdit}
                onChange={(v) => handleChange("permanentAddress", v)} />
            </Section>

            <Section title="Professional Information">
              <Row label="Experience" value={profile.experience} isEdit={isEdit}
                onChange={(v) => handleChange("experience", v)} />
              <Row label="Subjects Dealt" value={profile.subjects} isEdit={isEdit}
                onChange={(v) => handleChange("subjects", v)} />
              <Row label="Classes Dealt" value={profile.classes} isEdit={isEdit}
                onChange={(v) => handleChange("classes", v)} />
            </Section>

            <Section title="Family Information">
              <Row label="Father Name" value={profile.fatherName} isEdit={isEdit}
                onChange={(v) => handleChange("fatherName", v)} />
              <Row label="Father Mobile" value={profile.fatherPhone} isEdit={isEdit}
                onChange={(v) => handleChange("fatherPhone", v)} />
              <Row label="Mother Name" value={profile.motherName} isEdit={isEdit}
                onChange={(v) => handleChange("motherName", v)} />
              <Row label="Mother Mobile" value={profile.motherPhone} isEdit={isEdit}
                onChange={(v) => handleChange("motherPhone", v)} />
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

const Row = ({ label, value, isEdit, onChange }) => (
  <div className="grid grid-cols-3 border-b-2 border-blue-100 last:border-b-0">
    <div className="bg-blue-50 px-4 py-3 font-medium text-gray-700 border-r-2 border-blue-100">
      {label}
    </div>
    <div className="col-span-2 px-4 py-3">
      {isEdit ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <span className="text-gray-800">{value}</span>
      )}
    </div>
  </div>
);

export default ProfileView;
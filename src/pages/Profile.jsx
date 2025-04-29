// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/ui/DashboardHeader';
import { getUserProfile, updateUserProfile } from '../api/api';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    userType: '', // Will be set from backend response
    company: {
      companyName: '',
      rc: '',
      nIf: '',
      responsableName: '',
    },
    individual: {
      fullName: '',
      nationalId: '',
      phone: '',
      address: '',
    },
    email: '',
    phone: '',
    address: '',
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await getUserProfile(); 
  
        const user = response?.user; // ✅ FIX HERE
        if (!user) {
          throw new Error('Invalid profile data received');
        }
  
        setProfileData(prev => ({
          ...prev,
          ...user,
          userType: user.userType || 'COMPANY', 
          company: user.company || {},
          individual: user.individual || {}
        }));
      } catch (err) {
        console.error('Failed to fetch profile data:', err);
        setError('Failed to load profile information');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfileData();
  }, []);
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested properties (for company and individual fields)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      // Handle top-level properties
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(profileData); // ADD THIS
      await updateUserProfile(profileData);
      alert('Profile updated successfully');
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError('Failed to update profile information');
    }
  };
  

  const getInitials = () => {
    const nameSource = profileData.userType === 'COMPANY' 
      ? (profileData.company?.companyName || '')
      : (profileData.individual?.fullName || '');

    if (nameSource) {
      return nameSource.split(" ").map(n => n[0]).join("").toUpperCase();
    }
    return 'OU';
  };

  // Define form fields based on userType
  const formFields = profileData.userType === 'COMPANY' 
    ? [
        { name: 'company.companyName', label: 'Company Name' },
        { name: 'company.rc', label: 'Registration Number (RC)' },
        { name: 'company.nIf', label: 'Tax Identification Number (IF)' },
        { name: 'email', label: 'Company Email' },
        { name: 'company.phone', label: 'Company Phone Number' },
        { name: 'company.address', label: 'Company Address' },
        { name: 'company.responsableName', label: "Responsible Person's Full Name" }
      ]
    : [
        { name: 'individual.fullName', label: 'Full Name' },
        { name: 'individual.nationalId', label: 'National ID' },
        { name: 'email', label: 'Email Address' },
        { name: 'individual.phone', label: 'Phone Number' },
        { name: 'individual.address', label: 'Address' }
      ];

  // Helper function to get nested values
  const getNestedValue = (obj, path) => {
    const parts = path.split('.');
    let value = obj;
    for (const part of parts) {
      value = value?.[part];
      if (value === undefined) return '';
    }
    return value || '';
  };

  return (
    <div>
      <DashboardHeader h1="Profile" />

      {loading ? (
        <div className="flex justify-center p-10">Loading profile information...</div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
          <p className="text-red-700">{error}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <main className='bg-white rounded-[14px] p-4 md:p-6 lg:p-10 grid grid-cols-1 mb-5'>
            <div className="mb-12 flex items-center justify-center md:justify-start">
              <div className="flex items-center gap-4">
                <div className="bg-[#00b4d8] text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">
                  {getInitials()}
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold">
                    {profileData.userType === 'COMPANY' 
                      ? profileData.company?.companyName || '—'
                      : profileData.individual?.fullName || '—'}
                  </h2>
                  <p className="text-[#00b4d8]">
                    {profileData.email || '—'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-8 md:space-y-15">
              {formFields.map((field, index) => (
                <div key={field.name} className={`auth-input-container w-full max-w-[530px] ${index === formFields.length - 1 ? 'md:col-span-2' : ''}`}>
                  <div className="relative w-full px-3 md:px-0">
                    <label htmlFor={field.name.replace('.', '-')} className="absolute text-[14px] md:text-[15px] font-semibold bottom-8 lg:bottom-[45px] left-[8px] bg-white px-3 py-0 text-primary">
                      {field.label}
                    </label>
                    <input  
                      name={field.name}
                      id={field.name.replace('.', '-')}
                      type="text" 
                      value={getNestedValue(profileData, field.name)}
                      onChange={handleInputChange}
                      placeholder={`Enter your ${field.label.toLowerCase()}`} 
                      className="text-[12px] md:text-[16px] font-medium text-secondaire outline-none appearance-none border border-primary rounded-[50px] py-[12px] lg:py-[15px] px-[15px] md:px-[20px] lg:px-[25px] w-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                type="submit" 
                className="bg-[#00b4d8] text-white px-6 py-3 rounded-[50px] hover:bg-[#0096b4] transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </main>
        </form>
      )}
    </div>
  );
};

export default Profile;

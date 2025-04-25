import React, { useState } from 'react';

const NewOrderDetailsPackageMain = () => {
  const [packageContents, setPackageContents] = useState("");
  const [additionalNote, setAdditionalNote] = useState("");

  return (
    <div className="px-6 py-8 md:mt-8">
      <h1 className="text-3xl font-bold text-center mb-16">
        <span className="text-[#2e3192]">What is in the </span>
        <span className="text-[#00b4d8]">package</span>
        <span className="text-[#2e3192]"> ?</span>
      </h1>

      {/* Form Fields */}
      <div className="space-y-16 text-center">
        {/* Package Contents Field */}
        <div>
          <label className="block text-[#00b4d8] text-xl mb-4">What is in the package ?</label>
          <input
            type="text"
            value={packageContents}
            onChange={(e) => setPackageContents(e.target.value)}
            className="w-full px-2 py-2 bg-transparent border-b border-[#2e3192] focus:outline-none"
          />
        </div>

        {/* Additional Note Field */}
        <div>
          <label className="block text-[#00b4d8] text-xl mb-4">Additional Note (Optional)</label>
          <input
            type="text"
            value={additionalNote}
            onChange={(e) => setAdditionalNote(e.target.value)}
            placeholder="Any special instructions"
            className="w-full px-2 py-2 text-gray-400 bg-transparent border-b border-[#2e3192] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default NewOrderDetailsPackageMain;
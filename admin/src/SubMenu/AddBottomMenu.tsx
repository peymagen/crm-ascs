import React, { useState } from 'react';

type AddBottomMenuProps = {
  onClose: () => void;
};

const AddBottomMenu: React.FC<AddBottomMenuProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    website: 'English',
    displayOnMenu: 'Yes',
    displayArea: 'Bottom Menu',
    menuName: '',
    menuSubHeading: '',
    menuDescription: '',
    menuPosition: '',
    seoUrl: '',
    otherUrl: '',
    target: 'Same Window'
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white relative p-6 sm:p-8 rounded shadow-md w-full">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
        title="Close"
      >
        &times;
      </button>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Add Bottom Menu</h2>
        <nav className="text-sm text-gray-500">
          <span className="text-blue-600 hover:underline cursor-pointer">Dashboard</span>
          <span className="mx-2">/</span>
          <span className="text-blue-600 hover:underline cursor-pointer">Bottom Menus</span>
          <span className="mx-2">/</span>
          <span className="text-gray-600">Add Bottom Menu</span>
        </nav>
      </div>

      {/* Form */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Website <span className="text-red-500">*</span>
          </label>
          <select
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        {/* Display On Menu */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Display on Menu <span className="text-red-500">*</span>
          </label>
          <select
            name="displayOnMenu"
            value={formData.displayOnMenu}
            onChange={handleInputChange}
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Display Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Display Area <span className="text-red-500">*</span>
          </label>
          <select
            name="displayArea"
            value={formData.displayArea}
            onChange={handleInputChange}
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="Bottom Menu">Bottom Menu</option>
            <option value="Top Menu">Top Menu</option>
          </select>
        </div>

        {/* Menu Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Menu Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="menuName"
            value={formData.menuName}
            onChange={handleInputChange}
            placeholder="Enter Menu Name"
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Menu Sub Heading */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Menu Sub Heading</label>
          <input
            type="text"
            name="menuSubHeading"
            value={formData.menuSubHeading}
            onChange={handleInputChange}
            placeholder="Enter Sub Heading"
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Menu Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Menu Description</label>
          <textarea
            name="menuDescription"
            value={formData.menuDescription}
            onChange={handleInputChange}
            placeholder="Enter Menu Description"
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
            rows={3}
          />
        </div>

        {/* Menu Position */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Menu Position <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="menuPosition"
            value={formData.menuPosition}
            onChange={handleInputChange}
            placeholder="Enter Position"
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        {/* SEO URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">SEO URL</label>
          <input
            type="text"
            name="seoUrl"
            value={formData.seoUrl}
            onChange={handleInputChange}
            placeholder="Enter SEO Friendly URL"
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Other URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Other URL</label>
          <input
            type="text"
            name="otherUrl"
            value={formData.otherUrl}
            onChange={handleInputChange}
            placeholder="Enter Alternate URL"
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Target */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Target</label>
          <select
            name="target"
            value={formData.target}
            onChange={handleInputChange}
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="Same Window">Same Window</option>
            <option value="New Window">New Window</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBottomMenu;

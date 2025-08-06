import React, { useState } from 'react';
import AddBottomMenu from './AddBottomMenu';
import { Edit, Trash2 } from 'lucide-react';

const ListBottomData: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const dummyData = [
    { name: 'Home', email: 'home@site.com', company: 'Main Menu' },
    { name: 'About', email: 'about@site.com', company: 'Footer' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Bottom Menus</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New
        </button>
      </div>

      <table className="w-full table-auto border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Company</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.email}</td>
              <td className="p-3">{item.company}</td>
              <td className="p-3">
                <div className="flex space-x-4 text-gray-600">
                  <button title="Edit" className="hover:text-blue-600">
                    <Edit size={18} />
                  </button>
                  <button title="Delete" className="hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Overlay */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg relative">
            <AddBottomMenu onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListBottomData;

import React from 'react';

const PromptWindow = ({ heading, action, handlePromptAction, handlePromptCancel }) => {
  let actionBtnCss = "text-white rounded-md px-4 py-2 mr-2 ";
  actionBtnCss += action==="Delete"?"bg-red-400 hover:bg-red-500":"bg-blue-400 hover:bg-blue-500";
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">{heading}</h2>
        <div className="flex justify-end">
          <button onClick={handlePromptAction} className={actionBtnCss}>
            {action}
          </button>
          <button onClick={handlePromptCancel} className="bg-gray-300 hover:bg-gray-400 text-black rounded-md px-4 py-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptWindow;

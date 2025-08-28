import React from "react";

const AttendanceTable = ({ records = [], showCheckboxes = false, onCheck = () => {} }) => {
  return (
    <table className="table-auto w-full border border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 border">Student</th>
          <th className="px-4 py-2 border">Date</th>
          <th className="px-4 py-2 border">Subject</th>
          <th className="px-4 py-2 border">Status</th>
        </tr>
      </thead>
      <tbody>
        {records.length > 0 ? (
          records.map((record, idx) => (
            <tr key={record.id || idx} className="text-center border-t">
              <td className="px-4 py-2 border">{record.student}</td>
              <td className="px-4 py-2 border">{record.date}</td>
              <td className="px-4 py-2 border">{record.subject}</td>
              <td className="px-4 py-2 border">
                {showCheckboxes ? (
                  <input
                    type="checkbox"
                    checked={record.status === "Present"}
                    onChange={(e) => onCheck(record.id, e.target.checked)}
                  />
                ) : (
                  record.status
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center py-4">
              No records available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AttendanceTable;

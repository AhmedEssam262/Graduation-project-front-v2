import React from "react";

const ProfileTable = ({
  data,
  headers,
  headerColor,
  propColor,
  handleDrawer,
  icon,
}) => {
  return (
    <table className="w-full text-left bg-white rounded-lg">
      {headers && (
        <thead
          className={`text-gray-500 border-b-2 border-gray-400 ${
            headerColor || "bg-gray-700"
          }`}
        >
          <tr>
            {headers?.map((val, i) => (
              <th
                key={i + 1}
                scope="col"
                colSpan={
                  (data ? Object.entries(data?.[0])?.[0]?.length : 0) /
                  (headers?.length || 1)
                }
                className="px-6 py-3 text-gray-100"
              >
                {val}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {data?.map(({ name, value }, i, arr) => (
          <tr key={i + 1}>
            <th
              scope="row"
              className={`text-gray-500/80 border-b border-gray-300 capitalize ${
                propColor || "bg-gray-100"
              } text-sm sm:text-lg 
                p-3 font-medium w-1/3`}
            >
              {name}
            </th>
            <td
              className={`px-2 text-gray-400 ${
                i + 1 == arr?.length ? "" : "border-b border-gray-100"
              } break-all text-sm sm:text-lg font-medium`}
            >
              {value || <div className="">{icon}</div>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProfileTable;

import Sidebar from "../../components/Sidebar";

const Users = () => {
  const users = [
    { id: 1, name: "Asep", email: "asep@example.com" },
    { id: 2, name: "Budi", email: "budi@example.com" },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h1 className="text-2xl font-bold">Daftar Pengguna</h1>
        <table className="w-full mt-4 bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Nama</th>
              <th className="py-2 px-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import Card from '../components/Card';
import Button from '../components/Button';

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  const filteredUsers = data?.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.username.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage, 
    page * itemsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
            ⚠️ Error Loading Users
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card title="👥 User Directory" className="border-t-4 border-green-600">
        <div className="space-y-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search by name, email, or username..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
          />
          
          {filteredUsers.length > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Found {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </Card>

      {filteredUsers.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No users found matching "{search}"
            </p>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedUsers.map((user) => (
              <Card 
                key={user.id} 
                className="hover:border-l-4 hover:border-blue-600 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {user.name}
                    </h3>
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-semibold">
                      ID: {user.id}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">👤</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        @{user.username}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">📧</span>
                      <a 
                        href={`mailto:${user.email}`} 
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {user.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">📱</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {user.phone}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">🌐</span>
                      <a 
                        href={`https://${user.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {user.website}
                      </a>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t
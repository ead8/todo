// src/HomePage.js
import React, { useEffect, useState } from 'react';
import CollectionCard from '../components/collectionCard';


import { createNewCollection, getCollections } from '../api/collection';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import Loader from '../components/Loader';
import { IoAdd } from 'react-icons/io5';

function HomePage() {

  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'favorite'
  const navigate = useNavigate()
  
  const [isLoading, setIsLoading] = useState(false)
  const {
    collections,
    selectedCollection,
    
    user,
    fetchCollections,
   
    
    setDialogOpen,
    setNewTask,
    addTask,
    addCollection,
    toggleFavorite,
    setSelectedCollection,
    logout,
  } = useStore();
  useEffect(() => {
    setIsLoading(true)
    if (user) {
      fetchCollections()
      setIsLoading(false)
    }
  }, [user, fetchCollections])
  
console.log("selectedCollection", selectedCollection)

  // Filter collections based on the active tab
  const displayedCollections =
    activeTab === 'all'
      ? collections
      : collections?.length > 0 && collections?.filter((col) => col?.isFavorite);
  if (isLoading) return <Loader/>
  return (
    <div className={`min-h-screen dark:bg-gray-900 dark:text-white bg-gray-100 text-black`}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex justify-center min-h-screen">

        <div className="p-6 max-w-6xl mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Collections</h1>
            <div className="space-x-1">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded ${activeTab === 'all'
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-gray-100 text-gray-600'
                  }`}
              >
                All collections
              </button>
              <button
                onClick={() => setActiveTab('favorite')}
                className={`px-4 py-2 rounded ${activeTab === 'favorite'
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-gray-100 text-gray-600'
                  }`}
              >
                Favorite
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCollections?.length > 0 ? (
              displayedCollections?.map((collection) => (
                <CollectionCard
                  key={collection?._id}
                  collection={collection}
                  onClick={() => {
                    setSelectedCollection(collection)
                    navigate(`/collection/${collection?._id}`)
                  }}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
                No {activeTab === 'favorite' ? 'favorite' : ' '} collections yet.
              </div>
            )}
            <button
              onClick={addCollection}
              className="flex items-center justify-center h-40 bg-gray-200 rounded-lg border-2 border-dashed border-gray-400 text-gray-500"
            >
              <IoAdd size={30}/>
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}

export default HomePage;